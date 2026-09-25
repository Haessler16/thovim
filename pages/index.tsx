import type { ReactNode } from 'react';

import { AILab } from '../components/experience/AILab';
import { ArchitectureLab } from '../components/experience/ArchitectureLab';
import { CaseFiles } from '../components/experience/CaseFiles';
import { Contact } from '../components/experience/Contact';
import { ExperienceShell } from '../components/experience/ExperienceShell';
import { Hero } from '../components/experience/Hero';
import { HumanExe } from '../components/experience/HumanExe';
import { Now } from '../components/experience/Now';
import { ProblemLab } from '../components/experience/ProblemLab';
import { Proof } from '../components/experience/Proof';
import { TechnologyLab } from '../components/experience/TechnologyLab';
import { WhoAmI } from '../components/experience/WhoAmI';
import type { PageWithLayout } from '../lib/layout';

/**
 * `/` — the HAESSLER WORLD experience.
 *
 * Section order follows one continuous story (system → proof → tools →
 * problems → cases → architecture → AI → human → now → contact), so the page
 * never feels like unrelated blocks stapled together.
 *
 * The legacy portfolio is untouched and still online: `/classic` carries the
 * original homepage, and every `/about`, `/works` and `/contact` route still
 * renders inside the legacy shell.
 *
 * The 3D workstation (`components/3d/WorkstationScene`) mounts lazily into
 * the slot the hero reserves. Without JavaScript or WebGL the hero's terminal
 * readout remains, so the page never depends on the scene to be understood.
 */
const Home: PageWithLayout = () => (
  <>
    <Hero />
    <WhoAmI />
    <Proof />
    <TechnologyLab />
    <ProblemLab />
    <CaseFiles />
    <ArchitectureLab />
    <AILab />
    <HumanExe />
    <Now />
    <Contact />
  </>
);

Home.getLayout = (page: ReactNode) => <ExperienceShell>{page}</ExperienceShell>;

export default Home;
