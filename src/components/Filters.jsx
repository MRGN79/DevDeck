import { useI18n } from '../i18n/useI18n.js';

const STATUSES = ['active', 'in-progress', 'paused', 'idea'];

export function Filters({ statusFilter, onStatusChange, publicOnly, onPublicOnlyChange }) {
  const { t } = useI18n();

  return (
    <div className="filters">
      <div className="filters__group" role="group" aria-label={t('filters.statusLabel')}>
        <button
          type="button"
          aria-pressed={statusFilter === 'all'}
          className={`filter-pill ${statusFilter === 'all' ? 'filter-pill--active' : ''}`}
          onClick={() => onStatusChange('all')}
        >
          {t('filters.statusAll')}
        </button>
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={statusFilter === status}
            className={`filter-pill ${statusFilter === status ? 'filter-pill--active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {t(`status.${status}`)}
          </button>
        ))}
      </div>

      <label className="public-toggle">
        <span className="public-toggle__text">
          <span className="public-toggle__label">{t('filters.publicMode')}</span>
          <span className="public-toggle__hint">{t('filters.publicModeHint')}</span>
        </span>
        <input
          type="checkbox"
          role="switch"
          aria-checked={publicOnly}
          checked={publicOnly}
          onChange={(event) => onPublicOnlyChange(event.target.checked)}
        />
        <span className="public-toggle__track" aria-hidden="true">
          <span className="public-toggle__thumb" />
        </span>
      </label>
    </div>
  );
}
