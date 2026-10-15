import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent } from '../lib/telemetry';

describe('telemetry (simulated analytics)', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  it('logs [Analytics] prefix with event name', () => {
    trackEvent('member_search');
    expect(console.info).toHaveBeenCalled();
    const msg = console.info.mock.calls[0].join(' ');
    expect(msg).toContain('[Analytics]');
    expect(msg).toContain('member_search');
  });

  it('never throws on bad input', () => {
    expect(() => trackEvent()).not.toThrow();
    expect(() => trackEvent(null)).not.toThrow();
  });
});
