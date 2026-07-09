import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { projects } from './data/projects.js';
import { renderWithI18n } from './test/utils.jsx';

const cards = () => screen.queryAllByRole('article');
const cardNames = () =>
  screen.queryAllByRole('heading', { level: 2 }).map((h) => h.textContent);

// Fixture sin proyectos en estado "idea", independiente del catálogo real —
// garantiza que el filtro "Idea" deja el estado vacío sin importar qué
// proyectos existan en src/data/projects.js.
const NO_IDEA_PROJECTS = ['active', 'paused', 'in-progress'].map((status) => ({
  id: status,
  name: status,
  description: '',
  status,
  version: '1.0.0',
  scaffoldVersion: null,
  stack: [],
  repo: null,
  demo: null,
}));

describe('US-1 — Ver el catálogo', () => {
  it('CA-1.1: sin filtros muestra una tarjeta por cada proyecto de projects.js', () => {
    renderWithI18n(<App />);
    expect(cards()).toHaveLength(projects.length);
    expect(cardNames()).toEqual(projects.map((p) => p.name));
  });

  it('CA-1.3: la cabecera muestra title y subtitle (EN por defecto)', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('DevDeck');
    expect(
      screen.getByText('Your personal development project catalog'),
    ).toBeInTheDocument();
  });
});

describe('US-2 — Filtrar por estado', () => {
  it('CA-2.1: el filtro por defecto es "All" y quedan visibles todos', () => {
    renderWithI18n(<App />);
    const allPill = screen.getByRole('button', { name: 'All' });
    expect(allPill).toHaveClass('filter-pill--active');
    expect(cards()).toHaveLength(projects.length);
  });

  it('CA-2.2: pulsar un estado deja solo los proyectos de ese estado y marca la píldora', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'Active' }));

    const expected = projects.filter((p) => p.status === 'active').map((p) => p.name);
    expect(cardNames()).toEqual(expected);
    expect(screen.getByRole('button', { name: 'Active' })).toHaveClass(
      'filter-pill--active',
    );
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass(
      'filter-pill--active',
    );
  });

  it('CA-2.3: volver a "All" restaura todos los proyectos', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'Paused' }));
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(cards()).toHaveLength(projects.length);
  });

  it('CA-2.4: el grupo de filtros expone role=group con aria-label "Status"', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('group', { name: 'Status' })).toBeInTheDocument();
  });
});

describe('US-6 — Estado vacío', () => {
  it('CA-6.1: una combinación sin coincidencias oculta la grid y muestra el estado vacío', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App projects={NO_IDEA_PROJECTS} />);
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(cards()).toHaveLength(0);
    expect(screen.getByText('No projects match these filters')).toBeInTheDocument();
    expect(screen.getByText('Try a different status')).toBeInTheDocument();
  });

  it('CA-6.2: relajar los filtros hace reaparecer la grid', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App projects={NO_IDEA_PROJECTS} />);
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(cards()).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(cards()).toHaveLength(NO_IDEA_PROJECTS.length);
    expect(
      screen.queryByText('No projects match these filters'),
    ).not.toBeInTheDocument();
  });
});

describe('US-5 — Cambio de idioma EN/ES', () => {
  it('CA-5.1: el idioma por defecto es inglés', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('button', { name: 'EN' })).toHaveClass(
      'locale-switcher__active',
    );
    expect(screen.getByRole('group', { name: 'Status' })).toBeInTheDocument();
  });

  it('CA-5.2/5.3: pulsar ES traduce todos los textos y marca ES como activo', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'ES' }));

    expect(screen.getByRole('button', { name: 'ES' })).toHaveClass(
      'locale-switcher__active',
    );
    // cabecera, filtros, insignias y píldoras traducidos
    expect(
      screen.getByText('Tu catálogo personal de proyectos de desarrollo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Estado' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument();
    // insignia de estado traducida (Selfforge = active): aparece en la píldora de
    // filtro y en la insignia de la tarjeta -> al menos una ocurrencia
    expect(screen.getAllByText('Activo').length).toBeGreaterThan(0);
  });

  it('CA-5.3: el estado vacío también se traduce, sin claves sin resolver', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App projects={NO_IDEA_PROJECTS} />);
    await user.click(screen.getByRole('button', { name: 'ES' }));
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(
      screen.getByText('Ningún proyecto coincide con estos filtros'),
    ).toBeInTheDocument();
    expect(screen.getByText('Prueba otro estado')).toBeInTheDocument();
    // no debe quedar ninguna clave i18n cruda visible
    expect(document.body.textContent).not.toMatch(/empty\.(title|hint)/);
  });
});

describe('CA-1.4 — navegación por teclado', () => {
  it('los filtros y el conmutador de idioma son alcanzables y activables con teclado', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);

    // una píldora de estado se activa con Enter
    const active = screen.getByRole('button', { name: 'Active' });
    active.focus();
    await user.keyboard('{Enter}');
    expect(active).toHaveClass('filter-pill--active');

    // el conmutador de idioma es alcanzable y activable con teclado
    const es = screen.getByRole('button', { name: 'ES' });
    es.focus();
    await user.keyboard('{Enter}');
    expect(es).toHaveClass('locale-switcher__active');
  });
});
