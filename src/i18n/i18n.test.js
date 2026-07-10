import { describe, it, expect } from 'vitest';
import en from '../../locales/en/common.json';
import es from '../../locales/es/common.json';

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' ? flattenKeys(value, path) : [path];
  });
}

describe('i18n — paridad de claves EN/ES', () => {
  const enKeys = flattenKeys(en).sort();
  const esKeys = flattenKeys(es).sort();

  it('ambos locales tienen exactamente el mismo conjunto de claves', () => {
    expect(esKeys).toEqual(enKeys);
  });

  it('ningún valor de traducción está vacío', () => {
    for (const locale of [en, es]) {
      for (const key of flattenKeys(locale)) {
        const value = key.split('.').reduce((n, s) => n?.[s], locale);
        expect(value, `clave ${key}`).toBeTruthy();
      }
    }
  });

  it('todas las claves referenciadas por los criterios de aceptación existen', () => {
    const required = [
      'app.title',
      'app.subtitle',
      'app.languageLabel',
      'filters.statusLabel',
      'filters.statusAll',
      'status.active',
      'status.in-progress',
      'status.paused',
      'status.idea',
      'card.version',
      'card.scaffold',
      'card.repo',
      'card.demo',
      'card.notAvailable',
      'github.sectionLabel',
      'github.stars',
      'github.language',
      'github.commits',
      'github.contributors',
      'github.openIssues',
      'github.license',
      'github.size',
      'github.lastUpdate',
      'empty.title',
      'empty.hint',
    ];
    for (const key of required) {
      expect(enKeys, `EN falta ${key}`).toContain(key);
      expect(esKeys, `ES falta ${key}`).toContain(key);
    }
  });
});
