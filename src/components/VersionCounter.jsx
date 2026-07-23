import { useCountUp } from '../hooks/useCountUp.js';

function parseSegments(version) {
  const [major = 0, minor = 0, patch = 0] = version
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);
  return [major, minor, patch];
}

export function VersionCounter({ value }) {
  const [major, minor, patch] = parseSegments(value);
  const displayMajor = useCountUp(major);
  const displayMinor = useCountUp(minor);
  const displayPatch = useCountUp(patch);

  return (
    <span className="version-counter" aria-label={value}>
      {displayMajor}.{displayMinor}.{displayPatch}
    </span>
  );
}
