import { NextPage } from 'next';
import { List, ListItem } from '@chakra-ui/react';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { ArticleLayout } from '../../layouts/Article';
import { Section } from '../../components/Section';
import { Paragraph } from '../../components/Paragraph';
import { useTranslation } from '../../lib/dictionaries';

const Work: NextPage = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Nexxo">
      <Title>Nexxo - Expense Sharing App</Title>

      <Paragraph>{t.workPages.nexxo.p1}</Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.stack}</Meta>
          Expo React Native, NestJS, PostgreSQL, TypeScript
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.platform}</Meta>
          iOS & Android Mobile Application
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.features}</Meta>
          Expense Tracking, Bill Splitting, Group Management, Payment
          Integration
        </ListItem>
      </List>

      <Section delay={'0.1'}>
        <WorkImage
          src="/images/works/busi_home.jpeg"
          alt="Nexxo Mobile App Interface"
        />
      </Section>

      <Paragraph>{t.workPages.nexxo.p2}</Paragraph>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.keyFeatures}</Meta>
          Split expenses automatically, Track group balances, Settlement
          reminders
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.technology}</Meta>
          Real-time updates, Push notifications, Secure authentication
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.userExperience}</Meta>
          Intuitive UI, Offline support, Multi-currency support
        </ListItem>
      </List>

      <Paragraph>{t.workPages.nexxo.p3}</Paragraph>
    </ArticleLayout>
  );
};

export default Work;
