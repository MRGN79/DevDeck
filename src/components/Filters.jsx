import { useI18n } from '../i18n/useI18n.js';

const STATUSES = ['active', 'in-progress', 'paused', 'idea'];

export function Filters({ statusFilter, onStatusChange }) {
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
    </div>
  );
}
