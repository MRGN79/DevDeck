import { useI18n } from '../i18n/useI18n.js';
import { StatusBadge } from './StatusBadge.jsx';

export function ProjectCard({ project }) {
  const { t } = useI18n();
  const { name, description, status, version, scaffoldVersion, stack, repo, demo } = project;

  return (
    <article className="project-card">
      <header className="project-card__header">
        <h2 className="project-card__name">{name}</h2>
      </header>

      <StatusBadge status={status} />

      <p className="project-card__description">{description}</p>

      <dl className="project-card__meta">
        <div>
          <dt>{t('card.version')}</dt>
          <dd>{version}</dd>
        </div>
        <div>
          <dt>{t('card.scaffold')}</dt>
          <dd>{scaffoldVersion ?? t('card.notAvailable')}</dd>
        </div>
      </dl>

      <div className="project-card__stack">
        {stack.map((tech) => (
          <span key={tech} className="stack-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-card__links">
        {repo ? (
          <a href={repo} target="_blank" rel="noreferrer" className="project-link">
            {t('card.repo')}
          </a>
        ) : (
          <span className="project-link project-link--disabled">{t('card.repo')}</span>
        )}
        {demo ? (
          <a href={demo} target="_blank" rel="noreferrer" className="project-link">
            {t('card.demo')}
          </a>
        ) : (
          <span className="project-link project-link--disabled">{t('card.demo')}</span>
        )}
      </div>
    </article>
  );
}
