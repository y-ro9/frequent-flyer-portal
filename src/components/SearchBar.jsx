import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/telemetry';

export default function SearchBar({ onSearch, delay = 300 }) {
  const [value, setValue] = useState('');
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current?.(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  function handleChange(event) {
    const next = event.target.value;
    setValue(next);
    if (next.trim().length > 0) {
      trackEvent('member_search');
    }
  }

  return (
    <div className="search-bar">
      <label htmlFor="ff-search">Search members</label>
      <input
        id="ff-search"
        type="search"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        className="input"
      />
    </div>
  );
}
