import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCountUp } from './useCountUp.js';

describe('useCountUp', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('devuelve el valor final de inmediato si el usuario prefiere movimiento reducido', () => {
    window.matchMedia = () => ({ matches: true });
    const { result } = renderHook(() => useCountUp(42));
    expect(result.current).toBe(42);
  });

  it('empieza en 0 y cuenta hasta el valor objetivo cuando no hay preferencia de movimiento reducido', async () => {
    window.matchMedia = () => ({ matches: false });
    const { result } = renderHook(() => useCountUp(7, 30));
    expect(result.current).toBe(0);

    await waitFor(() => expect(result.current).toBe(7));
  });

  it('valor objetivo 0 no dispara ninguna animación visible', () => {
    window.matchMedia = () => ({ matches: false });
    const { result } = renderHook(() => useCountUp(0, 30));
    expect(result.current).toBe(0);
  });
});
