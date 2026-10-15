import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberForm from '../components/MemberForm';

describe('<MemberForm /> (Invalid Inputs + XSS)', () => {
  it('blocks submit when fields empty and highlights them in red', async () => {
    const onSubmit = vi.fn();
    render(<MemberForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('flags malformed email', async () => {
    const onSubmit = vi.fn();
    render(<MemberForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Yash Raj');
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('sanitizes input before calling onSubmit', async () => {
    const onSubmit = vi.fn();
    render(<MemberForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/full name/i), '<script>x</script>Yash');
    await userEvent.type(screen.getByLabelText(/email/i), 'yash@example.com');
    await userEvent.type(screen.getByLabelText(/frequent flyer number/i), 'FF12345');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalled();
    const payload = onSubmit.mock.calls[0][0];
    expect(payload.name).not.toContain('<script>');
  });

  it('all inputs have associated labels', () => {
    render(<MemberForm onSubmit={() => {}} />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/frequent flyer number/i)).toBeInTheDocument();
  });
});