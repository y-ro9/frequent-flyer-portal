import { describe, it, expect, beforeEach } from 'vitest';
import { loadMembers, saveMembers, STORAGE_KEY } from '../lib/storage';

describe('storage (localStorage persistence)', () => {
  beforeEach(() => localStorage.clear());

  it('returns [] when storage empty', () => {
    expect(loadMembers()).toEqual([]);
  });

  it('round-trips members', () => {
    const data = [{ id: '1', name: 'Yash' }];
    saveMembers(data);
    expect(loadMembers()).toEqual(data);
  });

  it('returns [] on corrupted JSON (does not throw)', () => {
    localStorage.setItem(STORAGE_KEY, '%%not-json%%');
    expect(loadMembers()).toEqual([]);
  });
});
