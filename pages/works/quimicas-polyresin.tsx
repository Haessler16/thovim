import { NextPage } from 'next';
import {
  Container,
  List,
  ListItem,
  AspectRatio,
  Image,
} from '@chakra-ui/react';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { ArticleLayout } from '../../layouts/Article';
import { Section } from '../../components/Section';
import { Paragraph } from '../../components/Paragraph';
import { useTranslation } from '../../lib/dictionaries';

const Work: NextPage = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Quimicas Polyresin">
      <Title>Quimicas Polyresin - Chemical Plant Services Portal</Title>

      <Paragraph>{t.workPages.quimicas.p1}</Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.stack}</Meta>
          Next.js, TypeScript, React, TailwindCSS, Node.js
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.platform}</Meta>
          Web Application, Responsive Design
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.features}</Meta>
          Dynamic Product Search, Technical Sheet Downloads, Service Showcase
        </ListItem>
      </List>

      <Section delay={'0.1'}>
        <WorkImage
          src="/images/works/hla_home.png"
          alt="Quimicas Polyresin Website"
        />
      </Section>

      <Paragraph>{t.workPages.quimicas.p2}</Paragraph>

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
          <Meta>{t.worksDetails.userExperience}</Meta>
          Responsive design, Fast loading, Professional UI/UX
        </ListItem>
      </List>

      <Section delay={'0.2'}>
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
          <Image
            src="/images/works/grupo-hla.jpg"
            alt="Product Search Interface"
          />
        </AspectRatio>
      </Section>

      <Paragraph>{t.workPages.quimicas.p3}</Paragraph>
    </ArticleLayout>
  );
};

export default Work;
