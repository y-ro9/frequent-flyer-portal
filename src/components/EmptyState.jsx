export default function EmptyState({ message = 'No data found' }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <p className="empty-state__text">{message}</p>
    </div>
  );
}
