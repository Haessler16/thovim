import type { CaseId } from './cases';

/**
 * Production metrics.
 *
 * `source` records where each number comes from so nothing is published
 * without traceability:
 *
 *  - 'repository': the figure is already documented in this repo
 *    (legacy dictionaries / project pages / CV content).
 *  - 'brief': the figure was supplied directly in the project brief and is
 *    not yet visible anywhere in the repo. Confirm it against the CV before
 *    going live.
 *
 * Never add a metric here without a source.
 */
export const metricIds = [
  'years',
  'activeUsers',
  'monthlyUsers',
  'codeDuplication',
  'featureDelivery',
  'queryLatency',
  'testCoverage',
  'transactionSuccess',
  'productionBugs',
] as const;

export type MetricId = (typeof metricIds)[number];

export type MetricSource = 'repository' | 'brief';

export interface MetricDefinition {
  id: MetricId;
  /** Displayed figure, e.g. "30K+". Kept as a string to preserve formatting. */
  value: string;
  source: MetricSource;
  /** Evidence: which case file this number belongs to. */
  caseId?: CaseId;
  /** Shown in the recruiter proof strip (max four, by design). */
  featured?: boolean;
}

export const metrics: Record<MetricId, MetricDefinition> = {
  years: { id: 'years', value: '9+', source: 'repository' },
  activeUsers: {
    id: 'activeUsers',
    value: '30K+',
    source: 'repository',
    caseId: 'busi',
    featured: true,
  },
  monthlyUsers: {
    id: 'monthlyUsers',
    value: '5K+',
    source: 'brief',
    caseId: 'zumetrics',
  },
  codeDuplication: {
    id: 'codeDuplication',
    value: '40%',
    source: 'brief',
    caseId: 'busi',
    featured: true,
  },
  featureDelivery: {
    id: 'featureDelivery',
    value: '25%',
    source: 'brief',
    caseId: 'busi',
  },
  queryLatency: {
    id: 'queryLatency',
    value: '40%',
    source: 'brief',
    caseId: 'zumetrics',
    featured: true,
  },
  testCoverage: {
    id: 'testCoverage',
    value: '90%',
    source: 'brief',
    caseId: 'decentralfi',
  },
  transactionSuccess: {
    id: 'transactionSuccess',
    value: '99.8%',
    source: 'brief',
    caseId: 'decentralfi',
    featured: true,
  },
  productionBugs: {
    id: 'productionBugs',
    value: '35%',
    source: 'brief',
    caseId: 'zumetrics',
  },
};

export const metricList: MetricDefinition[] = metricIds.map((id) => metrics[id]);

/** The four numbers used on /recrutatech. */
export const featuredMetricIds: MetricId[] = metricList
  .filter((metric) => metric.featured)
  .map((metric) => metric.id);

export const metricsForCase = (caseId: CaseId): MetricDefinition[] =>
  metricList.filter((metric) => metric.caseId === caseId);
