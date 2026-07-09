import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { projects } from './data/projects.js';
import { renderWithI18n } from './test/utils.jsx';

const cards = () => screen.queryAllByRole('article');
const cardNames = () =>
  screen.queryAllByRole('heading', { level: 2 }).map((h) => h.textContent);

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

describe('US-3 — Modo público', () => {
  it('CA-3.1: por defecto el modo público está desactivado y se ven públicos y privados', () => {
    renderWithI18n(<App />);
    expect(screen.getByRole('switch')).not.toBeChecked();
    expect(cards()).toHaveLength(projects.length);
    // hay al menos un privado visible
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  it('CA-3.2: activar el switch deja solo los proyectos isPublic:true', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('switch'));

    const expected = projects.filter((p) => p.isPublic).map((p) => p.name);
    expect(cardNames()).toEqual(expected);
    expect(screen.queryByText('Private')).not.toBeInTheDocument();
  });

  it('CA-3.3: desactivar el modo público vuelve a mostrar todos', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    await user.click(sw);
    expect(cards()).toHaveLength(projects.length);
  });

  it('CA-3.4: modo público + estado se combinan en AND lógico', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('switch'));
    await user.click(screen.getByRole('button', { name: 'Active' }));

    const expected = projects
      .filter((p) => p.isPublic && p.status === 'active')
      .map((p) => p.name);
    expect(cardNames()).toEqual(expected);
  });

  it('CA-3.5: el switch expone aria-checked reflejando su estado real', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    const sw = screen.getByRole('switch');
    expect(sw).toHaveAttribute('aria-checked', 'false');
    await user.click(sw);
    expect(sw).toHaveAttribute('aria-checked', 'true');
  });
});

describe('US-6 — Estado vacío', () => {
  it('CA-6.1: una combinación sin coincidencias oculta la grid y muestra el estado vacío', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    // ningún proyecto en estado "idea"
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(cards()).toHaveLength(0);
    expect(screen.getByText('No projects match these filters')).toBeInTheDocument();
    expect(
      screen.getByText('Try a different status or turn off public mode'),
    ).toBeInTheDocument();
  });

  it('CA-3.4/E-5: público + estado sin públicos de ese estado deja estado vacío', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('switch'));
    await user.click(screen.getByRole('button', { name: 'Paused' }));
    // FobForge está pausado pero es privado -> 0 resultados
    expect(cards()).toHaveLength(0);
    expect(screen.getByText('No projects match these filters')).toBeInTheDocument();
  });

  it('CA-6.2: relajar los filtros hace reaparecer la grid', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(cards()).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(cards()).toHaveLength(projects.length);
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
    expect(screen.getAllByText('Público').length).toBeGreaterThan(0);
    expect(screen.getByText('Privado')).toBeInTheDocument();
    // insignia de estado traducida (Selfforge = active): aparece en la píldora de
    // filtro y en la insignia de la tarjeta -> al menos una ocurrencia
    expect(screen.getAllByText('Activo').length).toBeGreaterThan(0);
  });

  it('CA-5.3: el estado vacío también se traduce, sin claves sin resolver', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);
    await user.click(screen.getByRole('button', { name: 'ES' }));
    await user.click(screen.getByRole('button', { name: 'Idea' }));
    expect(
      screen.getByText('Ningún proyecto coincide con estos filtros'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Prueba otro estado o desactiva el modo público'),
    ).toBeInTheDocument();
    // no debe quedar ninguna clave i18n cruda visible
    expect(document.body.textContent).not.toMatch(/empty\.(title|hint)/);
  });
});

describe('CA-1.4 — navegación por teclado', () => {
  it('los filtros, el switch y el conmutador de idioma son alcanzables y activables con teclado', async () => {
    const user = userEvent.setup();
    renderWithI18n(<App />);

    // el switch se activa con teclado (Espacio) al enfocarlo
    const sw = screen.getByRole('switch');
    sw.focus();
    expect(sw).toHaveFocus();
    await user.keyboard(' ');
    expect(sw).toBeChecked();

    // una píldora de estado se activa con Enter
    const active = screen.getByRole('button', { name: 'Active' });
    active.focus();
    await user.keyboard('{Enter}');
    expect(active).toHaveClass('filter-pill--active');
  });
});
