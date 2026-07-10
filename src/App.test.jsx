import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { projects } from './data/projects.js';
import { version } from '../package.json';
import { renderWithI18n } from './test/utils.jsx';

const cards = () => screen.queryAllByRole('article');
const cardNames = () =>
  screen.queryAllByRole('heading', { level: 2 }).map((h) => h.textContent);

describe('US-1 — Ver el catálogo', () => {
  it('CA-1.1: sin filtros muestra una tarjeta por cada proyecto de projects.js, en orden alfabético', () => {
    renderWithI18n(<App />);
    expect(cards()).toHaveLength(projects.length);
    const expected = [...projects].map((p) => p.name).sort((a, b) => a.localeCompare(b));
    expect(cardNames()).toEqual(expected);
  });

  it('CA-1.5: las tarjetas se ordenan alfabéticamente por nombre, no por orden de inserción', () => {
    const shuffled = [
      { id: 'z', name: 'Zeta', description: '', version: '1.0.0', scaffoldVersion: null, stack: [], repo: null, demo: null },
      { id: 'a', name: 'Alpha', description: '', version: '1.0.0', scaffoldVersion: null, stack: [], repo: null, demo: null },
      { id: 'm', name: 'Mid', description: '', version: '1.0.0', scaffoldVersion: null, stack: [], repo: null, demo: null },
    ];
    renderWithI18n(<App projects={shuffled} />);
    expect(cardNames()).toEqual(['Alpha', 'Mid', 'Zeta']);
  });

  it('CA-1.3: la cabecera muestra title y subtitle (EN por defecto)', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('DevDeck');
    expect(
      screen.getByText('Your personal development project catalog'),
    ).toBeInTheDocument();
  });

  it('CA-1.6: el pie de página muestra la versión del manifiesto y una descripción breve', () => {
    renderWithI18n(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(`DevDeck v${version}`);
    expect(
      screen.getByText('Built with React + Vite. GitHub stats refresh automatically.'),
    ).toBeInTheDocument();
  });
});

describe('US-5 — Cambio de idioma EN/ES', () => {
  it('CA-5.1: el idioma por defecto es inglés', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('button', { name: 'EN' })).toHaveClass(
      'locale-switcher__active',
    );
  });

  it('CA-5.2/5.3: pulsar ES traduce todos los textos y marca ES como activo', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'ES' }));

    expect(screen.getByRole('button', { name: 'ES' })).toHaveClass(
      'locale-switcher__active',
    );
    // cabecera y pie de página traducidos
    expect(
      screen.getByText('Tu catálogo personal de proyectos de desarrollo'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Hecho con React + Vite. Las estadísticas de GitHub se actualizan solas.'),
    ).toBeInTheDocument();
  });
});

describe('CA-1.4 — navegación por teclado', () => {
  it('el conmutador de idioma es alcanzable y activable con teclado', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);

    const es = screen.getByRole('button', { name: 'ES' });
    es.focus();
    await user.keyboard('{Enter}');
    expect(es).toHaveClass('locale-switcher__active');
  });
});
