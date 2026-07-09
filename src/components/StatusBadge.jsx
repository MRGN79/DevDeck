import { useI18n } from '../i18n/useI18n.js';

export function StatusBadge({ status }) {
  const { t } = useI18n();
  return <span className={`status-badge status-badge--${status}`}>{t(`status.${status}`)}</span>;
}
