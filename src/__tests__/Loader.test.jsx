import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader';

describe('<Loader /> (Bad Connectivity)', () => {
  it('renders accessible spinner with aria-live', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('has aria-busy=true', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });
});
