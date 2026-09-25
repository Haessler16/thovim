import { useSyncExternalStore } from 'react';

import {
  parseRecruiterSource,
  type RecruiterSource,
} from '../../lib/experience/content';

/** The query string never changes without a navigation, so there is nothing
 * to subscribe to — but `useSyncExternalStore` still gives us the correct
 * two-pass behaviour (server snapshot, then client snapshot). */
const subscribe = () => () => {};

const getSnapshot = () => window.location.search;

/** During SSR and hydration this is used, so the markup matches. */
const getServerSnapshot = () => '';

/**
 * Reads `?source=qr|nfc` written on the physical networking card.
 *
 * `useSyncExternalStore` is used instead of `router.query` so the server render
 * and the hydration render produce identical markup; reading `router.query`
 * directly would flash a hydration mismatch for a purely cosmetic note.
 * Any unknown value is rejected rather than trusted.
 */
export const useRecruiterSource = (): RecruiterSource | null => {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!search) return null;

  return parseRecruiterSource(new URLSearchParams(search).get('source') ?? undefined);
};
