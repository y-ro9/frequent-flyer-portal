const MAX_LEN = 200;
const SCRIPT_TAG_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const ANY_TAG_RE = /<[^>]*>/g;

/**
 * Sanitize untrusted text before storing it in state.
 * - Non-string input → ''
 * - Strips <script>…</script> entirely (including content)
 * - Strips all remaining HTML tags
 * - Escapes any residual dangerous characters
 * - Trims whitespace and caps length at MAX_LEN
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';

  let out = input
    .replace(SCRIPT_TAG_RE, '')
    .replace(ANY_TAG_RE, '');

  out = out
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return out.trim().slice(0, MAX_LEN);
}
