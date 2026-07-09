import { useMemo, useState } from 'react';
import { I18nContext } from './I18nContext.js';
import en from '../../locales/en/common.json';
import es from '../../locales/es/common.json';

const dictionaries = { en, es };

function resolveKey(dictionary, key) {
  return key.split('.').reduce((node, segment) => node?.[segment], dictionary);
}

function detectDefaultLocale() {
  const browserLocale = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'en';
  return dictionaries[browserLocale] ? browserLocale : 'en';
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(detectDefaultLocale);

  const value = useMemo(() => {
    const dictionary = dictionaries[locale];
    const t = (key) => resolveKey(dictionary, key) ?? key;
    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
