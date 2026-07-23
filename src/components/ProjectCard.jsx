import { useI18n } from '../i18n/useI18n.js';
import { VersionCounter } from './VersionCounter.jsx';
import { Counter } from './Counter.jsx';

export function ProjectCard({ project }) {
  const { t } = useI18n();
  const { id, name, description, version, scaffoldVersion, stack, repo, demo, github } = project;

  return (
    <article className="project-card" data-project={id}>
      <header className="project-card__header">
        <h2 className="project-card__name">{name}</h2>
      </header>

      <p className="project-card__description">{description}</p>

      <dl className="project-card__meta">
        <div>
          <dt>{t('card.version')}</dt>
          <dd>
            <VersionCounter value={version} />
          </dd>
        </div>
        <div>
          <dt>{t('card.scaffold')}</dt>
          <dd>
            {scaffoldVersion ? <VersionCounter value={scaffoldVersion} /> : t('card.notAvailable')}
          </dd>
        </div>
      </dl>

      <div className="project-card__stack">
        {stack.map((tech) => (
          <span key={tech} className="stack-tag">
            {tech}
          </span>
        ))}
      </div>

      {github && (
        <dl className="project-card__github" aria-label={t('github.sectionLabel')}>
          {typeof github.stars === 'number' && (
            <div>
              <dt>{t('github.stars')}</dt>
              <dd>
                <Counter value={github.stars} />
              </dd>
            </div>
          )}
          {github.language && (
            <div>
              <dt>{t('github.language')}</dt>
              <dd>{github.language}</dd>
            </div>
          )}
          {typeof github.commits === 'number' && (
            <div>
              <dt>{t('github.commits')}</dt>
              <dd>
                <Counter value={github.commits} />
              </dd>
            </div>
          )}
          {typeof github.contributors === 'number' && (
            <div>
              <dt>{t('github.contributors')}</dt>
              <dd>
                <Counter value={github.contributors} />
              </dd>
            </div>
          )}
          {typeof github.openIssues === 'number' && (
            <div>
              <dt>{t('github.openIssues')}</dt>
              <dd>
                <Counter value={github.openIssues} />
              </dd>
            </div>
          )}
          {github.license && (
            <div>
              <dt>{t('github.license')}</dt>
              <dd>{github.license}</dd>
            </div>
          )}
          {typeof github.sizeKb === 'number' && (
            <div>
              <dt>{t('github.size')}</dt>
              <dd>
                <Counter value={github.sizeKb} /> KB
              </dd>
            </div>
          )}
          {github.lastPushedAt && (
            <div>
              <dt>{t('github.lastUpdate')}</dt>
              <dd>{github.lastPushedAt.slice(0, 10)}</dd>
            </div>
          )}
        </dl>
      )}

      {github?.topics?.length > 0 && (
        <div className="project-card__topics">
          {github.topics.map((topic) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      )}

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
