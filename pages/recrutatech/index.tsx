import type { ReactNode } from 'react';

import { RecruiterCTA } from '../../components/recrutatech/RecruiterCTA';
import { RecruiterHero } from '../../components/recrutatech/RecruiterHero';
import { RecruiterLayout } from '../../components/recrutatech/RecruiterLayout';
import { RecruiterMetrics } from '../../components/recrutatech/RecruiterMetrics';
import { RecruiterOffer } from '../../components/recrutatech/RecruiterOffer';
import { RecruiterProjects } from '../../components/recrutatech/RecruiterProjects';
import { useRecruiterSource } from '../../components/recrutatech/useRecruiterSource';
import type { PageWithLayout } from '../../lib/layout';

/**
 * /recrutatech — the RecrutaTech 2026 networking page.
 *
 * Statically generated per locale (EN/PT). No 3D, no scroll-jacking: the whole
 * point is that someone who just met Haessler reaches proof, work and contact
 * in a few seconds, including on a phone over conference wifi.
 *
 * The physical card points here with ?source=qr or ?source=nfc.
 */
const RecrutatechPage: PageWithLayout = () => {
  const source = useRecruiterSource();

  return (
    <>
      <RecruiterHero source={source} />
      <RecruiterMetrics />
      <RecruiterOffer />
      <RecruiterProjects />
      <RecruiterCTA />
    </>
  );
};

RecrutatechPage.getLayout = (page: ReactNode) => (
  <RecruiterLayout>{page}</RecruiterLayout>
);

export default RecrutatechPage;
