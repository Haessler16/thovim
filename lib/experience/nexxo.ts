import type { MetricId } from './metrics';

/**
 * NEXXO PRODUCT LAB — data layer.
 *
 * Content rule (§15 of the Nexxo brief): every fact here is traceable to one
 * of two sources —
 *
 *  - the legacy portfolio page `/works/nexxo` (stack, platforms, capabilities)
 *  - the official product site https://nexxoapp.com and its `/about` page
 *    (concept, indexing/netting language, origin story, timeline, data
 *    sources such as BCV and IMF)
 *
 * There are NO user, revenue, download, funding or traction figures here on
 * purpose: none are published. The group preview below is the illustrative
 * example supplied by the product website and is labeled as such in the UI.
 */

export const nexxoProductUrl = 'https://nexxoapp.com/';

/** Deep-dive already written in the legacy portfolio. */
export const nexxoLegacyHref = '/works/nexxo';

/**
 * Verified stack (legacy `/works/nexxo` page). Nothing speculative is added —
 * no state libraries, no hosting claims.
 */
export const nexxoStack = [
  'Expo React Native',
  'NestJS',
  'PostgreSQL',
  'TypeScript',
] as const;

export const nexxoPlatforms = ['iOS', 'Android'] as const;

/**
 * Verified capabilities (legacy page features list).
 */
export const nexxoCapabilities = [
  'Expense tracking',
  'Bill splitting',
  'Group management',
  'Multi-currency support',
  'Offline support',
] as const;

/** Core product concepts (official website language). */
export const nexxoConceptIds = [
  'sharedExpenses',
  'currencyReference',
  'indexing',
  'netting',
  'settlement',
] as const;
export type NexxoConceptId = (typeof nexxoConceptIds)[number];

/** The §5 data flow, in product order. */
export const nexxoFlowIds = [
  'expense',
  'localCurrency',
  'referenceValue',
  'groupBalances',
  'netting',
  'settlement',
] as const;
export type NexxoFlowId = (typeof nexxoFlowIds)[number];

/** Verified use cases (official website). */
export const nexxoUseCaseIds = [
  'friendsTravelling',
  'couples',
  'roommates',
  'families',
  'smallTeams',
  'volatileEnvironments',
] as const;
export type NexxoUseCaseId = (typeof nexxoUseCaseIds)[number];

/**
 * Illustrative expense-group preview, taken from the official product
 * website as supplied in the brief. Rendered with an explicit
 * "illustrative" label; do not extend with invented figures.
 */
export const nexxoGroupPreview = {
  trip: 'La Guaira',
  members: [
    { name: 'Maria', amount: '+1.22 USD', positive: true },
    { name: 'Ivan', amount: '+6.22 USD', positive: true },
    { name: 'Ayrton', amount: '+10.12 USD', positive: true },
    { name: 'Juan', amount: '-17.56 USD', positive: false },
  ],
} as const;

/** Origin-story milestones (official /about page timeline). */
export type NexxoTimelineKey = 'y2024' | 'y2025' | 'y2026';

export const nexxoTimeline: Array<{ year: string; key: NexxoTimelineKey }> = [
  { year: '2024', key: 'y2024' },
  { year: '2025', key: 'y2025' },
  { year: '2026', key: 'y2026' },
];

/** Principles published on the official /about page. */
export const nexxoPrincipleKeys = [
  'fairness',
  'speed',
  'protection',
  'community',
] as const;
export type NexxoPrincipleKey = (typeof nexxoPrincipleKeys)[number];

/** The one verified headline number Nexxo contributes (years of work). */
export type NexxoMetricRef = MetricId;
