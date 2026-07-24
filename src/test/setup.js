import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom no implementa matchMedia. Por defecto simula que el usuario prefiere
// movimiento reducido, para que los componentes con animaciones (p.ej.
// VersionCounter/Counter) rendericen su valor final de inmediato en los
// tests, sin depender del timing de requestAnimationFrame.
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));

afterEach(() => {
  cleanup();
});
