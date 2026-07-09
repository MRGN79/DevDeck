import { describe, it, expect, vi } from 'vitest';

vi.mock('./projects.js', () => ({
  projects: [
    { id: 'a', name: 'A', repo: 'https://github.com/MRGN79/A', demo: null },
    { id: 'b', name: 'B', repo: 'https://github.com/MRGN79/B', demo: 'https://b-demo.example.com' },
    { id: 'c', name: 'C', repo: null, demo: null },
  ],
}));

vi.mock('./github-stats.generated.json', () => ({ default: {} }));

describe('mergedProjects', () => {
  it('defaults demo to the GitHub Pages URL when demo is null and repo is a GitHub URL', async () => {
    const { projects } = await import('./mergedProjects.js');
    expect(projects.find((p) => p.id === 'a').demo).toBe('https://mrgn79.github.io/A/');
  });

  it('keeps an explicit demo override instead of the GitHub Pages default', async () => {
    const { projects } = await import('./mergedProjects.js');
    expect(projects.find((p) => p.id === 'b').demo).toBe('https://b-demo.example.com');
  });

  it('leaves demo null when there is no repo to derive a default from', async () => {
    const { projects } = await import('./mergedProjects.js');
    expect(projects.find((p) => p.id === 'c').demo).toBeNull();
  });
});
