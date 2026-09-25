import type { ReactNode } from 'react';
import type { NextRouter } from 'next/router';
import { MainLayout } from '../../layouts/Main';

interface LegacyLayoutProps {
  children: ReactNode;
  router: NextRouter;
  locale?: string;
}

/**
 * Legacy portfolio shell.
 *
 * This deliberately contains no markup of its own: it delegates to
 * `layouts/Main.tsx`, which is the original global shell (Head, Navbar,
 * VoxelDog, container). The legacy site therefore keeps rendering exactly
 * as it did before the HAESSLER OS work started.
 *
 * New pages opt out of this by exporting their own `getLayout`.
 */
export const LegacyLayout = ({ children, router, locale }: LegacyLayoutProps) => (
  <MainLayout router={router} locale={locale}>
    {children}
  </MainLayout>
);
