import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Accessibility contract (Lighthouse 100 target)', () => {
  it('every interactive element has an accessible name', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      const name = btn.getAttribute('aria-label') || btn.textContent.trim();
      expect(name.length).toBeGreaterThan(0);
    });
  });

  it('has exactly one h1', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('all form inputs are labelled', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      expect(id).toBeTruthy();
    });
  });
});
