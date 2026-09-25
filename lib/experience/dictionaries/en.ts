import type {
  AiQuestionId,
  ArchitectureLayerId,
  ExperienceSectionId,
  HumanInterestId,
  LookingForId,
  NowFocusId,
  NowPriorityId,
  ProblemId,
  ToolId,
  WhatIBuildId,
} from '../content';
import type { CaseId } from '../cases';
import type { MetricId } from '../metrics';

/**
 * HAESSLER WORLD dictionary (English).
 *
 * Declared WITHOUT `as const` on purpose: `as const` narrows every string to a
 * literal type and makes the ES-style `const pt: ExperienceDictionary = {...}`
 * assignment fail. The legacy dictionaries follow the same rule.
 *
 * Typed maps are used for id-keyed copy (`Record<MetricId, ...>`), so adding a
 * metric/case id in the data layer immediately surfaces a type error here and
 * in `pt.ts` until both locales are written. That is the parity guarantee.
 */
export const en = {
  system: {
    name: 'HΛESSLER_WORLD',
    status: 'SYSTEM ONLINE',
    enter: 'ENTER WORLD',
    tagline: [
      'FULL STACK ENGINEER',
      'MOBILE ENGINEER',
      'TECH LEAD',
      '9+ YEARS EXPERIENCE',
    ],
  },
  shell: {
    skipToContent: 'Skip to content',
    quickView: 'Quick View',
    classicPortfolio: 'Classic Portfolio',
    language: 'Language',
  },
  nav: {
    system: 'SYSTEM',
    proof: 'PROOF',
    problems: 'PROBLEMS',
    cases: 'CASES',
    architecture: 'ARCHITECTURE',
    aiLab: 'AI LAB',
    human: 'HUMAN',
    now: 'NOW',
    contact: 'CONTACT',
  } satisfies Record<ExperienceSectionId, string>,
  role: {
    fullstackMobile: 'Full Stack & Mobile Engineer',
  },
  common: {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'Email',
    cv: 'CV',
    whatsapp: 'WhatsApp',
    location: 'Location',
    years: 'Years',
    yearsValue: '9+ years',
    backHome: 'Back to start',
  },
  metrics: {
    years: {
      label: 'YEARS ENGINEERING',
      context: 'Web, mobile and backend, in production.',
    },
    activeUsers: {
      label: 'ACTIVE USERS',
      context: 'Busi Boletos — passenger and operator apps.',
    },
    monthlyUsers: {
      label: 'MONTHLY USERS',
      context: 'Zumetrics — social analytics PWA.',
    },
    codeDuplication: {
      label: 'LESS CODE DUPLICATION',
      context: 'Busi — shared architecture, web + mobile.',
    },
    featureDelivery: {
      label: 'FASTER FEATURE DELIVERY',
      context: 'Busi — one codebase for web and mobile.',
    },
    queryLatency: {
      label: 'LOWER QUERY LATENCY',
      context: 'Zumetrics — Node.js / GraphQL data layer.',
    },
    testCoverage: {
      label: 'CRITICAL TEST COVERAGE',
      context: 'DecentralFi — wallet and transaction flows.',
    },
    transactionSuccess: {
      label: 'TRANSACTION SUCCESS',
      context: 'DecentralFi — on-chain transactions.',
    },
    productionBugs: {
      label: 'FEWER PRODUCTION BUGS',
      context: 'Zumetrics — production dashboards.',
    },
  } satisfies Record<MetricId, { label: string; context: string }>,
  cases: {
    busi: {
      title: 'Busi Boletos',
      category: 'PUBLIC TRANSPORT',
      role: 'Mobile / Frontend Engineer',
      summary:
        'A digital platform transforming public transportation in Latin America: apps for passengers and operators, digital ticket management and payment integrations.',
    },
    decentralfi: {
      title: 'DecentralFi',
      category: 'WEB3 / CRYPTO',
      role: 'Web3 / Frontend Developer',
      summary:
        'A decentralized web application for cryptocurrency transactions, wallet creation and management, market data and liquidity management on Thorchain.',
    },
    zumetrics: {
      title: 'Zumetrics',
      category: 'DATA / DASHBOARDS',
      role: 'Tech Lead / Full-Stack',
      summary:
        'A PWA to view and manage social media metrics, with a Node.js backend and custom data visualisation built for scale.',
    },
  } satisfies Record<
    CaseId,
    { title: string; category: string; role: string; summary: string }
  >,
  recruiter: {
    eyebrow: 'WE PROBABLY JUST MET.',
    metaSeparator: '·',
    sceneTitle: 'RECRUTATECH 2026',
    proofTitle: 'PROOF',
    whatIBuildTitle: 'WHAT I BUILD',
    casesTitle: 'SELECTED WORK',
    lookingForTitle: "WHAT I'M LOOKING FOR",
    contactTitle: 'GET IN TOUCH',
    statement: "LET'S BUILD SOMETHING",
    exploreFull: 'EXPLORE FULL EXPERIENCE',
    viewCase: 'OPEN CASE FILE',
    viewLive: 'LIVE SITE',
    sourceNfc: 'Opened from the NFC card.',
    sourceQr: 'Opened from the QR code.',
    whatIBuild: {
      fullStack: 'Full-stack applications',
      mobile: 'Mobile applications',
      backend: 'Backend systems',
      architecture: 'Architecture',
      aiAutomation: 'AI / automation',
    } satisfies Record<WhatIBuildId, string>,
    lookingFor: {
      softwareEngineering: 'Software engineering opportunities',
      fullStack: 'Full stack',
      mobile: 'Mobile',
      architectureLeadership: 'Architecture / technical leadership',
      aiAutomation: 'AI / automation',
    } satisfies Record<LookingForId, string>,
  },
  boot: {
    /**
     * Boot log. Four short lines and no fake progress bar: the whole sequence
     * runs for about a second and can be skipped.
     */
    lines: [
      'HΛESSLER_WORLD 9.0 — BOOT',
      'MOUNTING WORKSPACE ....... OK',
      'INDEXING CASE FILES ..... 03',
      'SYSTEM ONLINE',
    ],
    skip: 'SKIP',
  },
  hero: {
    eyebrow: 'INTERACTIVE ENGINEERING WORLD',
    intro:
      'I build production systems across web, mobile and backend — and I care about the architecture behind them.',
    readoutTitle: 'WORKSTATION.READOUT',
    readoutMeta: 'LIVE',
    scrollHint: 'SCROLL TO EXPLORE',
  },
  sections: {
    system: {
      lead: 'Full Stack & Mobile Engineer working across web, mobile and backend, with architecture as the through-line.',
      domainsLabel: 'DOMAINS',
      domains: ['FULL STACK', 'MOBILE', 'ARCHITECTURE', 'AI', 'PRODUCT'],
      stackLabel: 'CORE STACK',
      focusLabel: 'CURRENT FOCUS',
      focus: 'Production systems, architecture and product-focused engineering.',
    },
    proof: {
      lead: 'Numbers from production work, each one linked to the case file it came from.',
      evidence: 'EVIDENCE',
      verified: 'PORTFOLIO',
      /**
       * Only rendered while `process.env.NODE_ENV !== 'production'`, so a
       * figure that still needs confirming against the CV stays visible in
       * development and can never reach the published site as a hidden claim.
       */
      pending: 'TO CONFIRM',
    },
    tools: {
      /**
       * Technology Lab sits in the page flow but deliberately NOT in the
       * navigation: nine items is already the limit for a recruiter scanning
       * the bar, and this section is a support act for PROOF.
       */
      title: 'TECHNOLOGIES',
      lead: 'Technologies as tools: where they run, why they are there, and what came out of them.',
      labels: { where: 'WHERE', why: 'WHY', result: 'RESULT' },
      items: {
        react: {
          where: 'Frontend production applications',
          why: 'Component architecture and scalable UI',
          result: 'Busi — shared UI across web and mobile',
        },
        reactNative: {
          where: 'Mobile applications',
          why: 'One codebase for iOS and Android',
          result: 'Busi — 30K+ active users',
        },
        node: {
          where: 'Backend services',
          why: 'API architecture and data access',
          result: 'Zumetrics — 40% lower query latency',
        },
        nestjs: {
          where: 'Backend architecture',
          why: 'Structured services and maintainability',
          result: '',
        },
        typescript: {
          where: 'Web, mobile and backend codebases',
          why: 'One type contract across layers',
          result: '',
        },
        graphql: {
          where: 'Data access layer',
          why: 'A single typed contract per client',
          result: 'Zumetrics — 40% lower query latency',
        },
      } satisfies Record<
        ToolId,
        { where: string; why: string; result: string }
      >,
    },
    problems: {
      lead: 'Three real problems. Constraints first, then the decisions, the tradeoffs and what actually changed.',
      labels: {
        constraints: 'CONSTRAINTS',
        decisions: 'DECISIONS',
        tradeoffs: 'TRADEOFFS',
        stack: 'TOOLS',
        result: 'RESULT',
      },
      items: {
        scale: {
          title: 'A mobile app used daily by 30K+ people.',
          summary:
            'Passenger and operator apps for public transport, with digital tickets and payment integrations.',
          constraints: [
            'Payments and ticket validation sit in the same critical path.',
            'iOS and Android have to ship from the same feature work.',
            'The product keeps growing every release cycle.',
          ],
          decisions: [
            'Kept a single React Native / Expo codebase for both platforms.',
            'Shared UI and domain logic with the web application instead of writing it twice.',
            'Limited the native Swift / Kotlin surface to what the platform genuinely required.',
          ],
          tradeoffs: [
            'A shared codebase ships faster, but constrains deeply platform-specific work.',
            'Every native module adds surface area that has to be maintained.',
          ],
          result:
            '30K+ active users, 40% less duplicated code and 25% faster feature delivery.',
        },
        latency: {
          title: 'Query latency climbing on a live dashboard.',
          summary:
            'A metrics PWA where every dashboard view pushed more work onto the data layer.',
          constraints: [
            'The dashboard cannot go offline while it is being fixed.',
            'Different clients consume different slices of the same data.',
          ],
          decisions: [
            'Moved aggregation closer to the data layer instead of repeating it per client.',
            'Replaced chatty request patterns with a single typed contract per view.',
            'Measured the data layer before and after every change.',
          ],
          tradeoffs: [
            'One aggregated contract is cheaper per request but less flexible for one-off views.',
            'Caching hides slow queries unless it is measured, so latency stayed the metric of record.',
          ],
          result: '40% lower query latency.',
        },
        duplication: {
          title: 'Two frontends duplicating the same product.',
          summary:
            'Web and mobile implemented overlapping features, so every change had to land twice.',
          constraints: [
            'The platform was already serving 30K+ active users.',
            'A rewrite was not an option.',
          ],
          decisions: [
            'Extracted the shared domain and UI logic into one layer consumed by both clients.',
            'Deleted duplicated implementations instead of keeping them in sync by hand.',
          ],
          tradeoffs: [
            'Shared code demands stricter boundaries and review discipline.',
            'Extraction costs time up front to pay back in later release cycles.',
          ],
          result: '40% less code duplication and 25% faster feature delivery.',
        },
      } satisfies Record<
        ProblemId,
        {
          title: string;
          summary: string;
          constraints: string[];
          decisions: string[];
          tradeoffs: string[];
          result: string;
        }
      >,
    },
    cases: {
      lead: 'Three systems in production, in the order they shaped how I work.',
      labels: {
        stack: 'STACK',
        outcome: 'OUTCOME',
        role: 'ROLE',
        deepDive: 'FULL CASE STUDY',
        live: 'LIVE SITE',
        archive: 'MORE WORK',
      },
    },
    architecture: {
      lead: 'How a request travels through systems I build, and what each layer costs.',
      hint: 'SELECT A LAYER',
      labels: { why: 'WHY', tradeoff: 'TRADEOFF', channel: 'CHANNEL' },
      layers: {
        mobileApp: {
          label: 'MOBILE APP',
          why: 'The client is the product surface: device APIs, offline tolerance and release cycles live here.',
          tradeoff: 'More logic on the client means more places to version and test.',
        },
        api: {
          label: 'API',
          why: 'A single entry point keeps clients honest: validation, versioning and shaped responses.',
          tradeoff:
            'An entry point that does too much becomes the bottleneck for every client change.',
        },
        auth: {
          label: 'AUTH',
          why: 'Identity handled once and centrally, instead of once per client.',
          tradeoff:
            'Centralized auth is a shared dependency: an outage there stops everything upstream.',
        },
        services: {
          label: 'SERVICES',
          why: 'Domain boundaries keep business rules out of controllers and out of the UI.',
          tradeoff:
            'Splitting early costs more than it saves while the domain is still being understood.',
        },
        database: {
          label: 'DATABASE',
          why: 'The data model outlives the application, so schema decisions are the expensive ones.',
          tradeoff: 'Optimizing for one access pattern always penalizes another.',
        },
      } satisfies Record<
        ArchitectureLayerId,
        { label: string; why: string; tradeoff: string }
      >,
    },
    aiLab: {
      lead: 'AI and automation as plumbing: agents that reach internal systems through MCP, orchestrated with n8n.',
      askLabel: 'ASK HΛESSLER',
      askHint:
        'Answers come from this portfolio\u2019s structured data. Nothing is generated at runtime.',
      labels: { pipeline: 'PIPELINE', answer: 'ANSWER' },
      questions: {
        builds: {
          question: 'What do you build?',
          answer:
            'Full-stack and mobile products: React and React Native frontends, Node.js and NestJS services, and the architecture that connects them.',
        },
        stack: {
          question: "What's your strongest stack?",
          answer:
            'React, React Native, Node.js, Next.js and NestJS, in production. Busi Boletos (React Native, 30K+ active users) and Zumetrics (Next.js, GraphQL, Node.js) are the clearest examples.',
        },
        busi: {
          question: 'Tell me about Busi.',
          answer:
            'A public transport platform for Latin America: passenger and operator apps, digital tickets and payment integrations. 30K+ active users, 40% less duplicated code, 25% faster feature delivery.',
        },
        architecture: {
          question: 'How do you approach architecture?',
          answer:
            'Boundaries first: keep business rules out of the UI and out of controllers, share only what is genuinely the same, and optimize the access pattern you can measure. The ARCHITECTURE section walks through the tradeoffs.',
        },
        ai: {
          question: 'What is your experience with AI?',
          answer:
            'Integrations rather than research: AI agents connected to internal systems through MCP, with n8n handling the automation in between.',
        },
        lookingFor: {
          question: 'What are you looking for?',
          answer:
            'Software engineering opportunities where full-stack, mobile and architecture work meet, including AI and automation.',
        },
      } satisfies Record<AiQuestionId, { question: string; answer: string }>,
    },
    human: {
      lead: 'Outside the editor.',
      interests: {
        comics: 'Comics',
        drawing: 'Drawing',
        music: 'Music',
        photography: 'Photography',
        machineLearning: 'Machine learning',
      } satisfies Record<HumanInterestId, string>,
      note: 'The same curiosity, applied without a ticket.',
    },
    now: {
      lead: 'Where I am and what I am working on.',
      labels: {
        location: 'LOCATION',
        focus: 'FOCUS',
        lookingFor: 'LOOKING FOR',
        priorities: 'CURRENT PRIORITIES',
      },
      focus: {
        fullStack: 'Full stack',
        mobile: 'Mobile',
        architecture: 'Architecture',
        ai: 'AI',
      } satisfies Record<NowFocusId, string>,
      priorities: {
        productionSystems: 'Production systems',
        architecture: 'Architecture',
        productEngineering: 'Product-focused engineering',
        aiAutomation: 'AI / automation',
      } satisfies Record<NowPriorityId, string>,
    },
    contact: {
      statement: "LET'S BUILD SOMETHING",
      lead: 'Open to software engineering opportunities across full-stack, mobile, architecture and AI automation.',
      classicHint: 'The original portfolio, still online.',
      recruiterHint: 'Short version for a screen or a badge scan.',
    },
  },
};

export type ExperienceDictionary = typeof en;
