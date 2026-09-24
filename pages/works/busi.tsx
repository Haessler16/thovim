import { NextPage } from 'next';
import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Section } from '../../components/Section';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';
import { useTranslation } from '../../lib/dictionaries';

const Work: NextPage = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Busi">
      <Title>Busi</Title>

      <Paragraph>{t.workPages.busi.p1}</Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.website}</Meta>
          <Link href="https://www.busiboletos.com/" target="_blank">
            https://www.busiboletos.com/ <ExternalLinkIcon mx={2} />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.stack}</Meta>
          React, Next.js, TypeScript, React Native, Ionic, Node.js, PostgreSQL
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.platform}</Meta>
          Web Application, Mobile Application
        </ListItem>
      </List>

      <Section delay={'0.1'}>
        <WorkImage src="/images/works/busi_home.jpeg" alt="Busi Mobile App" />
      </Section>

      <Paragraph>{t.workPages.busi.p2}</Paragraph>

      <List ml={4} my={4}>
        <ListItem>
          <Badge mr={2}>{t.workPages.busi.badge1}</Badge>
          {t.workPages.busi.badge1Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.busi.badge2}</Badge>
          {t.workPages.busi.badge2Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.busi.badge3}</Badge>
          {t.workPages.busi.badge3Desc}
        </ListItem>
      </List>
    </ArticleLayout>
  );
};

export default Work;
