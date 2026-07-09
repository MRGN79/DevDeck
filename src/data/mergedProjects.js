import { projects as manualProjects } from './projects.js';
import githubStats from './github-stats.generated.json';
import { parseGithubSlug } from '../../scripts/github-stats-helpers.mjs';

export const projects = manualProjects.map((project) => {
  const slug = parseGithubSlug(project.repo);
  return { ...project, github: (slug && githubStats[slug]) || null };
});
