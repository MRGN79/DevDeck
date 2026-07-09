import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { ProjectCard } from './ProjectCard.jsx';
import { renderWithI18n } from '../test/utils.jsx';

const baseProject = {
  id: 'demo-project',
  name: 'DemoProject',
  description: 'A synthetic test project.',
  status: 'active',
  version: '2.0.0',
  scaffoldVersion: '1.15.0',
  stack: ['React', 'Vite', 'TypeScript'],
  repo: 'https://example.test/repo',
  demo: 'https://example.test/demo',
};

const build = (overrides) => ({ ...baseProject, ...overrides });

describe('US-4 — Metadatos de la tarjeta', () => {
  it('CA-1.2/CA-4.1/CA-4.3: renderiza nombre, versión, scaffold y stack', () => {
    renderWithI18n(<ProjectCard project={build()} />);
    const card = screen.getByRole('article');

    expect(within(card).getByRole('heading', { level: 2 })).toHaveTextContent(
      'DemoProject',
    );
    expect(within(card).getByText('Version')).toBeInTheDocument();
    expect(within(card).getByText('2.0.0')).toBeInTheDocument();
    expect(within(card).getByText('Scaffold')).toBeInTheDocument();
    expect(within(card).getByText('1.15.0')).toBeInTheDocument();

    ['React', 'Vite', 'TypeScript'].forEach((tech) => {
      expect(within(card).getByText(tech)).toBeInTheDocument();
    });
  });

  it('CA-4.2/E-1: scaffoldVersion null muestra "Not available"', () => {
    renderWithI18n(<ProjectCard project={build({ scaffoldVersion: null })} />);
    expect(screen.getByText('Not available')).toBeInTheDocument();
  });

  it('CA-4.4: repo no nulo es un <a> con target=_blank y rel=noreferrer', () => {
    renderWithI18n(<ProjectCard project={build()} />);
    const link = screen.getByRole('link', { name: 'Repository' });
    expect(link).toHaveAttribute('href', 'https://example.test/repo');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('CA-4.4/E-2: repo null se renderiza deshabilitado sin navegación', () => {
    renderWithI18n(<ProjectCard project={build({ repo: null })} />);
    expect(screen.queryByRole('link', { name: 'Repository' })).not.toBeInTheDocument();
    const disabled = screen.getByText('Repository');
    expect(disabled.tagName).toBe('SPAN');
    expect(disabled).toHaveClass('project-link--disabled');
  });

  it('CA-4.5: demo no nulo es enlace y demo null se muestra deshabilitado', () => {
    const { unmount } = renderWithI18n(<ProjectCard project={build()} />);
    const link = screen.getByRole('link', { name: 'Demo' });
    expect(link).toHaveAttribute('href', 'https://example.test/demo');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    unmount();

    renderWithI18n(<ProjectCard project={build({ demo: null })} />);
    expect(screen.queryByRole('link', { name: 'Demo' })).not.toBeInTheDocument();
    expect(screen.getByText('Demo')).toHaveClass('project-link--disabled');
  });

  it('E-6: stack vacío no rompe la tarjeta y no renderiza etiquetas', () => {
    renderWithI18n(<ProjectCard project={build({ stack: [] })} />);
    const card = screen.getByRole('article');
    expect(card.querySelectorAll('.stack-tag')).toHaveLength(0);
    // la tarjeta sigue mostrando su nombre
    expect(within(card).getByText('DemoProject')).toBeInTheDocument();
  });
});

describe('US-7 — Estadísticas de GitHub', () => {
  const github = {
    stars: 42,
    language: 'JavaScript',
    commits: 128,
    contributors: 2,
    openIssues: 3,
    license: 'MIT',
    sizeKb: 512,
    lastPushedAt: '2026-07-01T10:00:00Z',
    topics: ['catalog', 'react'],
  };

  it('sin github, no renderiza la sección de estadísticas ni topics', () => {
    renderWithI18n(<ProjectCard project={build({ github: null })} />);
    expect(screen.queryByText('Stars')).not.toBeInTheDocument();
    expect(screen.queryByText('GitHub stats')).not.toBeInTheDocument();
  });

  it('con github, renderiza estrellas, lenguaje, commits, colaboradores, issues, licencia, tamaño y fecha', () => {
    renderWithI18n(<ProjectCard project={build({ github })} />);
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Commits')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('Contributors')).toBeInTheDocument();
    expect(screen.getByText('Open issues')).toBeInTheDocument();
    expect(screen.getByText('License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('512 KB')).toBeInTheDocument();
    expect(screen.getByText('2026-07-01')).toBeInTheDocument();
  });

  it('renderiza cada topic como etiqueta independiente', () => {
    renderWithI18n(<ProjectCard project={build({ github })} />);
    expect(screen.getByText('catalog')).toHaveClass('topic-tag');
    expect(screen.getByText('react')).toHaveClass('topic-tag');
  });

  it('campos ausentes (null) no rompen el render y se omiten', () => {
    renderWithI18n(
      <ProjectCard
        project={build({ github: { stars: 5, language: null, topics: [] } })}
      />,
    );
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.queryByText('Language')).not.toBeInTheDocument();
  });
});
