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
import { Section } from '../../components/Section';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const Work: NextPage = () => (
  <ArticleLayout title="Busi">
    <Title>Busi</Title>

    <Paragraph>
      A comprehensive digital platform that transforms the public transportation
      experience in Latin America. Busi is revolutionizing how people purchase
      and manage bus tickets, offering a transparent and planned mobility
      experience through digitalization.
    </Paragraph>
    <List ml={4} my={4}>
      <ListItem>
        <Meta>Website</Meta>
        <Link href="https://www.busiboletos.com/" target="_blank">
          https://www.busiboletos.com/ <ExternalLinkIcon mx={2} />
        </Link>
      </ListItem>
      <ListItem>
        <Meta>Stack</Meta>
        React, Next.js, TypeScript, React Native, Ionic, Node.js, PostgreSQL
      </ListItem>
      <ListItem>
        <Meta>Platform</Meta>
        Web Application, Mobile Application
      </ListItem>
    </List>

    <Section delay={'0.1'}>
      <WorkImage src="/images/works/busi_home.jpeg" alt="Busi Mobile App" />
    </Section>

    <Paragraph>
      The platform offers a suite of digital solutions including mobile apps for
      passengers and operators, digital ticket management, and bus rental
      services. Key features include ticket price checking, departure schedules,
      QR code tickets, and a comprehensive operator management system.
    </Paragraph>

    <List ml={4} my={4}>
      <ListItem>
        <Badge mr={2}>Mobile Apps</Badge>
        Android & iOS applications with digital ticket management
      </ListItem>
      <ListItem>
        <Badge mr={2}>Integration</Badge>
        Payment gateways, QR code system, Real-time tracking
      </ListItem>
      <ListItem>
        <Badge mr={2}>Business Model</Badge>
        B2C (Passengers) and B2B (Bus Operators) solutions
      </ListItem>
    </List>
  </ArticleLayout>
);

export default Work;
