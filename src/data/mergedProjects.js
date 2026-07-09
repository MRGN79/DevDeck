import { projects as manualProjects } from './projects.js';
import githubStats from './github-stats.generated.json';
import { parseGithubSlug, defaultGithubPagesUrl } from '../../scripts/github-stats-helpers.mjs';

export const projects = manualProjects.map((project) => {
  const slug = parseGithubSlug(project.repo);
  const github = (slug && githubStats[slug]) || null;
  // demo defaults to the project's GitHub Pages URL unless explicitly overridden
  // in projects.js (e.g. a project hosted elsewhere).
  const demo = project.demo ?? defaultGithubPagesUrl(project.repo);
  return { ...project, demo, github };
});
