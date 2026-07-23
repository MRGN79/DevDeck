import { useCountUp } from '../hooks/useCountUp.js';

export function Counter({ value }) {
  const display = useCountUp(value);
  return (
    <span className="counter-value" aria-label={String(value)}>
      {display}
    </span>
  );
}
