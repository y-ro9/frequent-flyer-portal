const PREFIX = '[Analytics]';
const PRODUCT = 'End-to-End Frequent Flyer Portal';

/**
 * Simulated analytics ping.
 * Logs a stable, greppable line to the console for every primary action.
 * Never throws — telemetry must not break the app.
 */
export function trackEvent(eventName) {
  try {
    const name =
      typeof eventName === 'string' && eventName.length > 0
        ? eventName
        : 'unknown_event';
    console.info(`${PREFIX} User interacted with ${PRODUCT}: ${name}`);
  } catch {
    /* noop */
  }
}
