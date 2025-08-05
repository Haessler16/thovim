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
  <ArticleLayout title="Quimicas Polyresin">
    <Title>Quimicas Polyresin - Chemical Plant Services Portal</Title>

    <Paragraph>
      A modern, professional landing page and service portal for a chemical
      manufacturing plant. The platform showcases the company&apos;s services
      and products while providing an advanced dynamic search system that allows
      users to find specific chemical products and download their technical
      specifications sheets.
    </Paragraph>
    <List ml={4} my={4}>
      <ListItem>
        <Meta>Stack</Meta>
        Next.js, TypeScript, React, TailwindCSS, Node.js
      </ListItem>
      <ListItem>
        <Meta>Platform</Meta>
        Web Application, Responsive Design
      </ListItem>
      <ListItem>
        <Meta>Features</Meta>
        Dynamic Product Search, Technical Sheet Downloads, Service Showcase
      </ListItem>
    </List>

    <Section delay={'0.1'}>
      <WorkImage
        src="/images/works/hla_home.png"
        alt="Quimicas Polyresin Website"
      />
    </Section>

    <Paragraph>
      The website features a sophisticated product catalog with advanced
      filtering and search capabilities. Users can easily navigate through the
      chemical product database, access detailed technical information, and
      download PDF specification sheets for each product, streamlining the
      procurement and research process for chemical industry professionals.
    </Paragraph>

    <List ml={4} my={4}>
      <ListItem>
        <Meta>Search System</Meta>
        Real-time filtering, Category-based search, Product specifications
        lookup
      </ListItem>
      <ListItem>
        <Meta>Document Management</Meta>
        PDF generation, Technical sheet downloads, Product documentation
      </ListItem>
      <ListItem>
        <Meta>User Experience</Meta>
        Responsive design, Fast loading, Professional UI/UX
      </ListItem>
    </List>

    <Section delay={'0.2'}>
      <WorkImage
        src="/images/works/grupo-hla.jpg"
        alt="Product Search Interface"
      />
    </Section>

    <Paragraph>
      Built with performance and user experience in mind, the platform serves as
      both a marketing tool and a functional resource for clients and potential
      customers. The dynamic search system and downloadable technical sheets
      make it an essential tool for chemical industry professionals seeking
      reliable product information and documentation.
    </Paragraph>
  </ArticleLayout>
);

export default Work;
