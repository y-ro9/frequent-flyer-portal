import EmptyState from './EmptyState';
import Loader from './Loader';

export default function MemberList({ members, loading = false }) {
  if (loading) {
    return <Loader label="Loading members…" />;
  }

  if (!members || members.length === 0) {
    return <EmptyState message="No data found" />;
  }

  return (
    <div className="member-list__wrap">
      <table className="member-list">
        <caption className="visually-hidden">Frequent flyer members</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">FF Number</th>
            <th scope="col">Tier</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.ffNumber}</td>
              <td>{m.tier || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
