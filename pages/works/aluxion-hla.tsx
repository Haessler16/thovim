import { NextPage } from 'next';
import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  AspectRatio,
  Image,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { ArticleLayout } from '../../layouts/Article';
import { Section } from '../../components/Section';
import { Paragraph } from '../../components/Paragraph';

const Work: NextPage = () => (
  <ArticleLayout title="Aluxion with HLA">
    <Title>Grupo HLA Healthcare Platform</Title>

    <Paragraph>
      A state-of-the-art healthcare management system developed for Grupo HLA,
      one of Spain&apos;s largest hospital providers with 18 hospitals and 20
      medical centers. The platform delivers cutting-edge medicine with a
      personalized approach, serving a vast network of healthcare facilities
      across Spain.
    </Paragraph>
    <List ml={4} my={4}>
      <ListItem>
        <Meta>Website</Meta>
        <Link href="https://www.grupohla.com/" target="_blank">
          https://www.grupohla.com/ <ExternalLinkIcon mx={2} />
        </Link>
      </ListItem>
      <ListItem>
        <Meta>Stack</Meta>
        React, Next.js, TypeScript, NestJS, PostgreSQL, Docker.
      </ListItem>

      <ListItem>
        <Meta>Platform</Meta>
        Web Portal & Mobile App
      </ListItem>
    </List>

    <Section delay={'0.1'}>
      <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Image src="/images/works/hla_home.png" alt="HLA Digital Platform" />
      </AspectRatio>
    </Section>

    <Paragraph>
      The platform revolutionizes healthcare management with features like
      instant appointment booking, personalized alerts, visit management, and
      arrival notifications. The system emphasizes data security and patient
      privacy while providing seamless access to medical services across all HLA
      facilities.
    </Paragraph>

    <List ml={4} my={4}>
      <ListItem>
        <Meta>Mobile Features</Meta>
        Appointment Scheduling, Personalized Alerts, Digital Check-in
      </ListItem>
      <ListItem>
        <Meta>Security</Meta>
        RGPD Compliance, Encrypted Data Transmission
      </ListItem>
      <ListItem>
        <Meta>Integration</Meta>
        Medical Records, Hospital Systems, International Patient Services
      </ListItem>
    </List>

    <Section delay={'0.2'}>
      <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Image src="/images/works/grupo-hla.jpg" alt="Grupo HLA Network" />
      </AspectRatio>
    </Section>

    <Paragraph>
      This collaboration represents HLA&apos;s commitment to digital
      transformation in healthcare, combining medical excellence with
      technological innovation. The platform serves a growing network of
      facilities while maintaining high standards of patient care and
      operational efficiency.
    </Paragraph>
  </ArticleLayout>
);

export default Work;
