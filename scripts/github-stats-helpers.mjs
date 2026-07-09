const GITHUB_REPO_URL_PATTERN = /^https:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/;

export function parseGithubSlug(repoUrl) {
  if (!repoUrl) return null;
  const match = repoUrl.match(GITHUB_REPO_URL_PATTERN);
  return match ? `${match[1]}/${match[2]}` : null;
}

export function defaultGithubPagesUrl(repoUrl) {
  const slug = parseGithubSlug(repoUrl);
  if (!slug) return null;
  const [owner, repo] = slug.split('/');
  // GitHub Pages preserves the repo's exact case in the path, but hostnames
  // are case-insensitive, so lowercasing the owner subdomain is safe.
  return `https://${owner.toLowerCase()}.github.io/${repo}/`;
}

export function lastPageFromLinkHeader(linkHeader) {
  if (!linkHeader) return null;
  const lastLink = linkHeader.split(',').find((part) => part.includes('rel="last"'));
  if (!lastLink) return null;
  const match = lastLink.match(/[?&]page=(\d+)/);
  return match ? Number(match[1]) : null;
}

export function buildStatsFromRepoResponse(repo) {
  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics ?? [],
    license: repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' ? repo.license.spdx_id : null,
    openIssues: repo.open_issues_count,
    lastPushedAt: repo.pushed_at,
    sizeKb: repo.size,
    homepage: repo.homepage || null,
    archived: repo.archived,
    fetchedAt: new Date().toISOString(),
  };
}
