import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App /> integration (Happy + Unhappy paths)', () => {
  beforeEach(() => localStorage.clear());

  it('renders portal heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /frequent flyer portal/i })).toBeInTheDocument();
  });

  it('shows EmptyState initially when no members', () => {
    render(<App />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it('adds a member and shows it in the table', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Yash Raj');
    await userEvent.type(screen.getByLabelText(/email/i), 'yash@example.com');
    await userEvent.type(screen.getByLabelText(/frequent flyer number/i), 'FF12345');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(await screen.findByText('Yash Raj')).toBeInTheDocument();
  });

  it('persists members across reload (localStorage)', async () => {
    const { unmount } = render(<App />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Persist Me');
    await userEvent.type(screen.getByLabelText(/email/i), 'p@example.com');
    await userEvent.type(screen.getByLabelText(/frequent flyer number/i), 'FF999');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    unmount();
    render(<App />);
    expect(await screen.findByText('Persist Me')).toBeInTheDocument();
  });
});
