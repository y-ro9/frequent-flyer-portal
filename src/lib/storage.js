export const STORAGE_KEY = 'ffp_members_v1';

/**
 * Load members from localStorage.
 * Never throws — returns [] for empty or corrupted data.
 */
export function loadMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist members to localStorage. Silently ignores quota errors.
 */
export function saveMembers(members) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch {
    /* quota / private mode — ignore */
  }
}
