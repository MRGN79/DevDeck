import { useMemo, useState } from 'react';
import { useI18n } from './i18n/useI18n.js';
import { projects as catalogProjects } from './data/mergedProjects.js';
import { ProjectCard } from './components/ProjectCard.jsx';
import { Filters } from './components/Filters.jsx';

export default function App({ projects = catalogProjects } = {}) {
  const { t, locale, setLocale } = useI18n();
  const [statusFilter, setStatusFilter] = useState('all');

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      if (statusFilter !== 'all' && project.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter, projects]);

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

      <Filters statusFilter={statusFilter} onStatusChange={setStatusFilter} />

      {visibleProjects.length > 0 ? (
        <section className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <div className="empty-state" role="status">
          <p className="empty-state__title">{t('empty.title')}</p>
          <p className="empty-state__hint">{t('empty.hint')}</p>
        </div>
      )}
    </div>
  );
}
