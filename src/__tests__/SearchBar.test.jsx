import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('<SearchBar />', () => {
  it('has accessible label', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByLabelText(/search members/i)).toBeInTheDocument();
  });

  it('calls onSearch on typing (debounced)', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await user.type(screen.getByLabelText(/search members/i), 'yash');
    await waitFor(() => expect(onSearch).toHaveBeenCalled(), { timeout: 1000 });
  });
});