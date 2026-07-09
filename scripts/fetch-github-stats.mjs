import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projects } from '../src/data/projects.js';
import { parseGithubSlug, lastPageFromLinkHeader, buildStatsFromRepoResponse } from './github-stats-helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/github-stats.generated.json');

const token = process.env.GH_STATS_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'devdeck-stats-fetcher',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response;
}

async function fetchCount(url) {
  const response = await fetchJson(`${url}?per_page=1`);
  const lastPage = lastPageFromLinkHeader(response.headers.get('link'));
  if (lastPage) return lastPage;
  const body = await response.json();
  return Array.isArray(body) ? body.length : 0;
}

async function fetchStatsForSlug(slug) {
  const repoResponse = await fetchJson(`https://api.github.com/repos/${slug}`);
  const repo = await repoResponse.json();
  const stats = buildStatsFromRepoResponse(repo);

  const [commits, contributors] = await Promise.all([
    fetchCount(`https://api.github.com/repos/${slug}/commits`).catch(() => null),
    fetchCount(`https://api.github.com/repos/${slug}/contributors?anon=true`).catch(() => null),
  ]);

  return { ...stats, commits, contributors };
}

async function loadExistingStats() {
  try {
    const raw = await readFile(OUTPUT_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function main() {
  const existing = await loadExistingStats();
  const slugs = [...new Set(projects.map((project) => parseGithubSlug(project.repo)).filter(Boolean))];

  const results = { ...existing };
  for (const slug of slugs) {
    try {
      results[slug] = await fetchStatsForSlug(slug);
      console.log(`✓ ${slug}`);
    } catch (error) {
      console.warn(`✗ ${slug}: ${error.message} — keeping previous data if any`);
    }
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(results, null, 2)}\n`);
  console.log(`Wrote stats for ${Object.keys(results).length} repo(s) to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error('fetch-github-stats failed:', error);
  // Never fail the build over stats — the site must still deploy with whatever data exists.
  process.exit(0);
});
