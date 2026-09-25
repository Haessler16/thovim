import type { NextPage } from 'next';
import type { ReactNode } from 'react';

/**
 * Pages Router page-level layout contract.
 *
 * A page opts in by exporting:
 *
 *   Page.getLayout = (page) => <MyShell>{page}</MyShell>;
 *
 * When `getLayout` is absent, `pages/_app.tsx` falls back to
 * `LegacyLayout`, which is byte-for-byte equivalent to the original
 * global shell. That is what keeps every legacy route untouched: only
 * new pages need to opt in.
 */
export type PageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
