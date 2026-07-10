import { describe, it, expect } from 'vitest';
import { parseGithubSlug, lastPageFromLinkHeader, buildStatsFromRepoResponse } from './github-stats-helpers.mjs';

describe('parseGithubSlug', () => {
  it('extracts owner/repo from a github.com URL', () => {
    expect(parseGithubSlug('https://github.com/MRGN79/DevDeck')).toBe('MRGN79/DevDeck');
  });

  it('tolerates a trailing slash', () => {
    expect(parseGithubSlug('https://github.com/MRGN79/DevDeck/')).toBe('MRGN79/DevDeck');
  });

  it('returns null for null, non-github or malformed URLs', () => {
    expect(parseGithubSlug(null)).toBeNull();
    expect(parseGithubSlug('https://gitlab.com/foo/bar')).toBeNull();
    expect(parseGithubSlug('https://github.com/only-owner')).toBeNull();
  });
});

describe('lastPageFromLinkHeader', () => {
  it('reads the page number from rel="last"', () => {
    const header =
      '<https://api.github.com/repositories/1/commits?per_page=1&page=2>; rel="next", ' +
      '<https://api.github.com/repositories/1/commits?per_page=1&page=142>; rel="last"';
    expect(lastPageFromLinkHeader(header)).toBe(142);
  });

  it('returns null when there is no Link header (single-page result)', () => {
    expect(lastPageFromLinkHeader(null)).toBeNull();
    expect(lastPageFromLinkHeader('')).toBeNull();
  });
});

describe('buildStatsFromRepoResponse', () => {
  it('maps the GitHub repo payload to our stats shape', () => {
    const stats = buildStatsFromRepoResponse({
      stargazers_count: 12,
      forks_count: 3,
      language: 'JavaScript',
      topics: ['catalog', 'react'],
      license: { spdx_id: 'MIT' },
      open_issues_count: 2,
      pushed_at: '2026-07-01T10:00:00Z',
      size: 512,
      homepage: '',
      archived: false,
    });

    expect(stats.stars).toBe(12);
    expect(stats.language).toBe('JavaScript');
    expect(stats.topics).toEqual(['catalog', 'react']);
    expect(stats.license).toBe('MIT');
    expect(stats.homepage).toBeNull();
    expect(stats.sizeKb).toBe(512);
  });

  it('normalizes a NOASSERTION license and a missing license to null', () => {
    expect(buildStatsFromRepoResponse({ license: { spdx_id: 'NOASSERTION' } }).license).toBeNull();
    expect(buildStatsFromRepoResponse({ license: null }).license).toBeNull();
  });

  it('defaults topics to an empty array when absent', () => {
    expect(buildStatsFromRepoResponse({}).topics).toEqual([]);
  });
});
