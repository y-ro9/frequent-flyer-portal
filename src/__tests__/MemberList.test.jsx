import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MemberList from '../components/MemberList';

const sample = [
  { id: '1', name: 'Yash Raj', email: 'yash@example.com', ffNumber: 'FF001', tier: 'Gold' },
];

describe('<MemberList />', () => {
  it('renders members in a semantic table', () => {
    render(<MemberList members={sample} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Yash Raj')).toBeInTheDocument();
  });

  it('shows EmptyState when list is empty (Unhappy Path)', () => {
    render(<MemberList members={[]} />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it('shows Loader when loading=true (Unhappy Path)', () => {
    render(<MemberList members={[]} loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
