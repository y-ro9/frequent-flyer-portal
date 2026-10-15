import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../components/EmptyState';

describe('<EmptyState /> (Unhappy Path)', () => {
  it('shows user-friendly message', () => {
    render(<EmptyState />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it('uses role=status for screen readers', () => {
    render(<EmptyState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
