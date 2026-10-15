export default function Loader({ label = 'Loading…' }) {
  return (
    <div
      className="loader"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  );
}
