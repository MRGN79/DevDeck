import { useMemo } from 'react';
import { useI18n } from './i18n/useI18n.js';
import { projects as catalogProjects } from './data/mergedProjects.js';
import { ProjectCard } from './components/ProjectCard.jsx';
import { version } from '../package.json';

export default function App({ projects = catalogProjects } = {}) {
  const { t, locale, setLocale } = useI18n();

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.name.localeCompare(b.name)),
    [projects],
  );

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>{t('app.title')}</h1>
          <p className="app-header__subtitle">{t('app.subtitle')}</p>
        </div>
        <div className="locale-switcher" role="group" aria-label={t('app.languageLabel')}>
          <button
            type="button"
            aria-pressed={locale === 'en'}
            className={locale === 'en' ? 'locale-switcher__active' : ''}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={locale === 'es'}
            className={locale === 'es' ? 'locale-switcher__active' : ''}
            onClick={() => setLocale('es')}
          >
            ES
          </button>
        </div>
      </header>

      <section className="project-grid">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      <footer className="app-footer">
        <span className="app-footer__version">DevDeck v{version}</span>
        <span className="app-footer__description">{t('app.footerDescription')}</span>
      </footer>
    </div>
  );
}
