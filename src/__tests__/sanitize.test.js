import { describe, it, expect } from 'vitest';
import { sanitizeText } from '../lib/sanitize';

describe('sanitizeText (XSS protection)', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(42)).toBe('');
  });

  it('strips <script> tags', () => {
    expect(sanitizeText('<script>alert(1)</script>')).not.toContain('<script>');
    expect(sanitizeText('<script>alert(1)</script>')).not.toContain('alert(1)');
  });

  it('escapes HTML special chars', () => {
    const out = sanitizeText('<img src=x onerror=alert(1)>');
    expect(out).not.toMatch(/<|>/);
  });

  it('trims whitespace and caps length at 200 chars', () => {
    expect(sanitizeText('   hello   ')).toBe('hello');
    expect(sanitizeText('a'.repeat(500)).length).toBeLessThanOrEqual(200);
  });

  it('preserves safe text', () => {
    expect(sanitizeText('Yash Raj')).toBe('Yash Raj');
  });
});
