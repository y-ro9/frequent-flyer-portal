import { useEffect, useMemo, useState } from 'react';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import SearchBar from './components/SearchBar';
import { loadMembers, saveMembers } from './lib/storage';
import { trackEvent } from './lib/telemetry';

function newId() {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [members, setMembers] = useState(() => loadMembers());
  const [query, setQuery] = useState('');

  // Telemetry: portal opened (primary action)
  useEffect(() => {
    trackEvent('app_loaded');
  }, []);

  useEffect(() => {
    saveMembers(members);
  }, [members]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) =>
      [m.name, m.email, m.ffNumber]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [members, query]);

  function handleAdd(payload) {
    const member = {
      id: newId(),
      tier: 'Standard',
      ...payload,
    };
    setMembers((prev) => [member, ...prev]);
  }

  function handleSearch(value) {
    setQuery(value);
  }

  return (
    <main className="app" aria-label="Frequent Flyer Portal">
      <header className="app__header">
        <h1 className="app__title">Frequent Flyer Portal</h1>
        <p className="app__subtitle">
          Manage frequent flyer members end-to-end — add, search, and persist.
        </p>
      </header>

      <section className="app__section" aria-labelledby="add-member-heading">
        <h2 id="add-member-heading" className="app__section-title">
          Add member
        </h2>
        <MemberForm onSubmit={handleAdd} />
      </section>

      <section className="app__section" aria-labelledby="members-heading">
        <h2 id="members-heading" className="app__section-title">
          Members
        </h2>
        <SearchBar onSearch={handleSearch} />
        <MemberList members={filtered} />
      </section>
    </main>
  );
}