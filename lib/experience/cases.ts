import type { MetricId } from './metrics';

/**
 * Flagship case files.
 *
 * Only factual, locale-independent data lives here (ids, stack names, links,
 * metric references). Every sentence is in `lib/experience/dictionaries`, so
 * the same structure can be rendered in EN and PT without duplication.
 *
 * `legacyHref` points at the existing, already-written project pages. The new
 * experience links out to them instead of duplicating the write-ups.
 */
export const caseIds = ['busi', 'decentralfi', 'zumetrics'] as const;

export type CaseId = (typeof caseIds)[number];

export interface ExperienceCase {
  id: CaseId;
  /** Monospace file label, e.g. "CASE FILE 01". */
  code: string;
  /** Lead metric for the recruiter card. */
  headlineMetricId: MetricId;
  metricIds: MetricId[];
  stack: string[];
  /** Existing legacy deep-dive. Reused, never rewritten. */
  legacyHref: string;
  /** Optional public product link (only where already published). */
  externalHref?: string;
}

export const experienceCases: Record<CaseId, ExperienceCase> = {
  busi: {
    id: 'busi',
    code: 'CASE FILE 01',
    headlineMetricId: 'activeUsers',
    metricIds: ['activeUsers', 'codeDuplication', 'featureDelivery'],
    stack: [
      'React Native',
      'Expo',
      'Swift',
      'Kotlin',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Cypress',
    ],
    legacyHref: '/works/busi',
  },
  decentralfi: {
    id: 'decentralfi',
    code: 'CASE FILE 02',
    headlineMetricId: 'transactionSuccess',
    metricIds: ['transactionSuccess', 'testCoverage'],
    stack: [
      'React',
      'Next.js',
      'Angular',
      'TypeScript',
      'Web3',
      'MetaMask',
      'XDEFI',
      'Thorchain',
    ],
    legacyHref: '/works/decentralfi',
    externalHref: 'https://decentralfi.io/',
  },
  zumetrics: {
    id: 'zumetrics',
    code: 'CASE FILE 03',
    headlineMetricId: 'queryLatency',
    metricIds: ['queryLatency', 'monthlyUsers', 'productionBugs'],
    stack: [
      'Next.js',
      'Redux',
      'TypeScript',
      'Node.js',
      'Express',
      'GraphQL',
      'MongoDB',
      'Chart.js',
      'D3',
    ],
    legacyHref: '/works/zumetrics',
  },
};

export const caseList: ExperienceCase[] = caseIds.map((id) => experienceCases[id]);
