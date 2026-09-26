import { caseIds, type CaseId } from './cases';
import { featuredMetricIds, type MetricId } from './metrics';

/**
 * Single source of truth for the HAESSLER OS layer.
 *
 * Division of responsibility, on purpose:
 *   - this file  -> facts, ids, links, structure (locale-independent)
 *   - dictionaries -> every human-readable sentence (EN + PT)
 *
 * Nothing here should ever contain prose, and nothing in the dictionaries
 * should ever contain a URL or a number.
 */

export interface ProfileLinks {
  portfolio: string;
  linkedin: string;
  github: string;
  email: string;
  /** No public phone/WhatsApp number is documented in this repo. */
  whatsapp: string | null;
}

export interface Profile {
  name: string;
  /** Key into `dictionaries[locale].role`. */
  roleKey: 'fullstackMobile';
  yearsMetricId: MetricId;
  location: string;
  links: ProfileLinks;
}

/**
 * Not `as const`: `cv` and `whatsapp` must stay `string | null` so the UI can
 * conditionally render those actions the moment real URLs are available,
 * instead of the type collapsing them to `null` and making the branch dead.
 */
export const profile: Profile = {
  name: 'Haessler León',
  roleKey: 'fullstackMobile',
  yearsMetricId: 'years',
  location: 'Curitiba, Brazil',
  links: {
    portfolio: 'https://haessler.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/haessler-leon/',
    github: 'https://github.com/Haessler16/',
    email: 'haesslertvm@gmail.com',
    whatsapp: null,
  },
};

/**
 * CV download links, one per experience language (Google Drive).
 *
 * Not `as const` / not nullable-by-accident: set to `null` to hide every CV
 * button at once if a link stops working. The UI resolves the active locale
 * through `resolveCvLink`; Spanish (legacy-only locale) falls back to EN.
 */
export const cvByLocale: { en: string; pt: string } | null = {
  en: 'https://drive.google.com/file/d/1Vou2Jy-KtSa8T8aL2A47JdROfeTFuOky/view?usp=drive_link',
  pt: 'https://drive.google.com/file/d/1ixHdQPLYuUVD9957AP9Nq85NxdhK_CJA/view?usp=drive_link',
};

/** CV link for the active locale; EN is the fallback. `null` hides the UI. */
export const resolveCvLink = (locale: string | undefined): string | null => {
  if (!cvByLocale) return null;
  return locale === 'pt' ? cvByLocale.pt : cvByLocale.en;
};

/** Core stack, in the order used by the CV and the recruiter page. */
export const coreStack = [
  'React',
  'React Native',
  'Node.js',
  'Next.js',
  'NestJS',
] as const;

export const experienceSectionIds = [
  'system',
  'proof',
  'problems',
  'cases',
  'architecture',
  'aiLab',
  'human',
  'now',
  'contact',
] as const;

export type ExperienceSectionId = (typeof experienceSectionIds)[number];

export interface ExperienceSection {
  id: ExperienceSectionId;
  /** Two-digit system index shown in the navigation. */
  index: string;
  /** DOM id used by anchor links and scroll-spy. */
  anchor: string;
}

/** Note: `now` exists as a system state on the page but not in the nav. */
export const experienceSections: ExperienceSection[] = experienceSectionIds.map(
  (id, position) => ({
    id,
    index: String(position + 1).padStart(2, '0'),
    anchor: id === 'aiLab' ? 'ai-lab' : id,
  })
);

/**
 * Two-digit system index for a section id.
 *
 * Sections render their own index from this instead of hardcoding "02" in
 * markup, so inserting a section renumbers the whole page.
 */
export const sectionIndex = (id: ExperienceSectionId): string =>
  experienceSections.find((section) => section.id === id)?.index ?? '';

/** DOM anchor for a section id. */
export const sectionAnchor = (id: ExperienceSectionId): string =>
  experienceSections.find((section) => section.id === id)?.anchor ?? id;

/** Technologies represented as engineering tools (WHAT/WHERE/WHY/RESULT). */
export const toolIds = [
  'react',
  'reactNative',
  'node',
  'nestjs',
  'typescript',
  'graphql',
] as const;

export type ToolId = (typeof toolIds)[number];

export interface Tool {
  id: ToolId;
  name: string;
  /** Where it is used in production, kept factual and short. */
  contextKey: string;
}

export const tools: Tool[] = [
  { id: 'react', name: 'React', contextKey: 'frontend' },
  { id: 'reactNative', name: 'React Native', contextKey: 'mobile' },
  { id: 'node', name: 'Node.js', contextKey: 'backend' },
  { id: 'nestjs', name: 'NestJS', contextKey: 'backendArchitecture' },
  { id: 'typescript', name: 'TypeScript', contextKey: 'shared' },
  { id: 'graphql', name: 'GraphQL', contextKey: 'dataAccess' },
];

/** Recruiter page: what I build. */
export const whatIBuildIds = [
  'fullStack',
  'mobile',
  'backend',
  'architecture',
  'aiAutomation',
] as const;

export type WhatIBuildId = (typeof whatIBuildIds)[number];

/** Recruiter page: what I am looking for. */
export const lookingForIds = [
  'softwareEngineering',
  'fullStack',
  'mobile',
  'architectureLeadership',
  'aiAutomation',
] as const;

export type LookingForId = (typeof lookingForIds)[number];

/** "NOW" system state. */
export const nowFocusIds = ['fullStack', 'mobile', 'architecture', 'ai'] as const;
export type NowFocusId = (typeof nowFocusIds)[number];

export const nowPriorityIds = [
  'productionSystems',
  'architecture',
  'productEngineering',
  'aiAutomation',
] as const;
export type NowPriorityId = (typeof nowPriorityIds)[number];

/** Recruiter page configuration. */
export const recruiter = {
  eventName: 'RECRUTATECH 2026',
  proofMetricIds: featuredMetricIds,
  caseIds: [...caseIds] as CaseId[],
  whatIBuildIds: [...whatIBuildIds],
  lookingForIds: [...lookingForIds],
} as const;

/* ------------------------------------------------------------------
   PROBLEM LAB
   Each problem points at a real case file and the metrics that back the
   outcome. The narrative (constraints, decisions, tradeoffs) lives in the
   dictionaries; here we only keep ids and references.
   ------------------------------------------------------------------ */

export const problemIds = ['scale', 'latency', 'duplication'] as const;
export type ProblemId = (typeof problemIds)[number];

export interface LabProblem {
  id: ProblemId;
  /** Monospace label, e.g. "PROBLEM 01". */
  code: string;
  /** Evidence: which case file this problem belongs to. */
  caseId: CaseId;
  metricIds: MetricId[];
}

export const problems: LabProblem[] = [
  {
    id: 'scale',
    code: 'PROBLEM 01',
    caseId: 'busi',
    metricIds: ['activeUsers'],
  },
  {
    id: 'latency',
    code: 'PROBLEM 02',
    caseId: 'zumetrics',
    metricIds: ['queryLatency'],
  },
  {
    id: 'duplication',
    code: 'PROBLEM 03',
    caseId: 'busi',
    metricIds: ['codeDuplication', 'featureDelivery'],
  },
];

/* ------------------------------------------------------------------
   ARCHITECTURE LAB
   Only technologies documented in the CV/portfolio appear as channels.
   ------------------------------------------------------------------ */

export const architectureLayerIds = [
  'mobileApp',
  'api',
  'auth',
  'services',
  'database',
] as const;
export type ArchitectureLayerId = (typeof architectureLayerIds)[number];

export interface ArchitectureLayer {
  id: ArchitectureLayerId;
  /** Documented technology passing through this layer. */
  channel: string;
}

export const architectureLayers: ArchitectureLayer[] = [
  { id: 'mobileApp', channel: 'REST / GraphQL' },
  { id: 'api', channel: 'Node.js / NestJS' },
  { id: 'auth', channel: 'Auth0' },
  { id: 'services', channel: 'GraphQL / Cache' },
  { id: 'database', channel: 'PostgreSQL / MongoDB' },
];

/* ------------------------------------------------------------------
   AI LAB
   ------------------------------------------------------------------ */

export const aiPipelineStageIds = [
  'agent',
  'mcp',
  'n8n',
  'internalSystem',
  'automation',
] as const;
export type AiPipelineStageId = (typeof aiPipelineStageIds)[number];

export interface AiPipelineStage {
  id: AiPipelineStageId;
  /** Product/technology name. A fact, not prose. */
  name: string;
}

export const aiPipeline: AiPipelineStage[] = [
  { id: 'agent', name: 'AI AGENT' },
  { id: 'mcp', name: 'MCP' },
  { id: 'n8n', name: 'N8N' },
  { id: 'internalSystem', name: 'INTERNAL SYSTEM' },
  { id: 'automation', name: 'AUTOMATION' },
];

/**
 * "ASK HΛESSLER" entries.
 *
 * The answers are static strings in the dictionaries, resolved from the same
 * structured facts used by the rest of the experience. Nothing is generated at
 * runtime, so the widget cannot invent an answer.
 */
export const aiQuestionIds = [
  'builds',
  'stack',
  'busi',
  'architecture',
  'ai',
  'lookingFor',
] as const;
export type AiQuestionId = (typeof aiQuestionIds)[number];

/* ------------------------------------------------------------------
   WORLD AREAS (Phase 4)
   The 3D layer is decorative; these are the facts its objects stand
   for. Geometry and positions live in `components/3d/WorldObjects` —
   here we only keep identity, semantic accent (§14) and proof links.
   ------------------------------------------------------------------ */

export const worldAreaIds = [
  'mobile',
  'web3',
  'backend',
  'architecture',
  'ai',
  'human',
  'nexxo',
] as const;
export type WorldAreaId = (typeof worldAreaIds)[number];

/** Chakra color tokens from `lib/theme.ts` — never raw hex in components. */
export type WorldAreaAccent =
  | 'osAccent'
  | 'osElectricBlue'
  | 'osViolet'
  | 'osMagenta'
  | 'osAmber';

export interface WorldArea {
  id: WorldAreaId;
  /** Semantic accent: MOBILE electric blue, WEB3 violet, AI magenta, HUMAN amber. */
  accent: WorldAreaAccent;
  /** Case file backing the area's proof. Areas without one link to a section. */
  caseId: CaseId | null;
  /** Metric surfaced on the hover chip; value from `metrics.ts`. */
  headlineMetricId: MetricId | null;
}

export const worldAreas: WorldArea[] = [
  {
    id: 'mobile',
    accent: 'osElectricBlue',
    caseId: 'busi',
    headlineMetricId: 'activeUsers',
  },
  {
    id: 'web3',
    accent: 'osViolet',
    caseId: 'decentralfi',
    headlineMetricId: 'transactionSuccess',
  },
  {
    id: 'backend',
    accent: 'osAccent',
    caseId: 'zumetrics',
    headlineMetricId: 'queryLatency',
  },
  {
    id: 'architecture',
    accent: 'osAccent',
    caseId: null,
    headlineMetricId: null,
  },
  {
    id: 'ai',
    accent: 'osMagenta',
    caseId: null,
    headlineMetricId: null,
  },
  {
    id: 'human',
    accent: 'osAmber',
    caseId: null,
    headlineMetricId: null,
  },
  {
    // NEXXO PRODUCT LAB: personal fintech product (§16 — a dimension, not a
    // ranking). Facts live in `lib/experience/nexxo.ts`; no case file and no
    // headline metric because none are published.
    id: 'nexxo',
    accent: 'osElectricBlue',
    caseId: null,
    headlineMetricId: null,
  },
];

/* ------------------------------------------------------------------
   HUMAN.EXE
   ------------------------------------------------------------------ */

export const humanInterestIds = [
  'comics',
  'drawing',
  'music',
  'photography',
  'machineLearning',
] as const;
export type HumanInterestId = (typeof humanInterestIds)[number];

/**
 * QR / NFC entry points written on the physical networking card.
 * Validated instead of trusted; no analytics is attached to them.
 */
export const recruiterSources = ['qr', 'nfc', 'link'] as const;
export type RecruiterSource = (typeof recruiterSources)[number];

export const parseRecruiterSource = (
  value: string | string[] | undefined
): RecruiterSource | null => {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return null;
  const normalized = candidate.toLowerCase();
  return (recruiterSources as readonly string[]).includes(normalized)
    ? (normalized as RecruiterSource)
    : null;
};
