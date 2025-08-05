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
  <ArticleLayout title="Nexxo">
    <Title>Nexxo - Expense Sharing App</Title>

    <Paragraph>
      A comprehensive mobile application designed to simplify expense management
      between friends and groups. Nexxo allows users to track shared expenses,
      split bills automatically, and settle debts seamlessly, making group
      financial management effortless and transparent.
    </Paragraph>
    <List ml={4} my={4}>
      <ListItem>
        <Meta>Stack</Meta>
        Expo React Native, NestJS, PostgreSQL, TypeScript
      </ListItem>
      <ListItem>
        <Meta>Platform</Meta>
        iOS & Android Mobile Application
      </ListItem>
      <ListItem>
        <Meta>Features</Meta>
        Expense Tracking, Bill Splitting, Group Management, Payment Integration
      </ListItem>
    </List>

    <Section delay={'0.1'}>
      <WorkImage
        src="/images/works/busi_home.jpeg"
        alt="Nexxo Mobile App Interface"
      />
    </Section>

    <Paragraph>
      Built with Expo React Native for cross-platform compatibility and powered
      by a robust NestJS backend with PostgreSQL database. The app features
      real-time synchronization, secure user authentication, and intuitive
      expense categorization to make group spending transparent and manageable.
    </Paragraph>

    <List ml={4} my={4}>
      <ListItem>
        <Meta>Key Features</Meta>
        Split expenses automatically, Track group balances, Settlement reminders
      </ListItem>
      <ListItem>
        <Meta>Technology</Meta>
        Real-time updates, Push notifications, Secure authentication
      </ListItem>
      <ListItem>
        <Meta>User Experience</Meta>
        Intuitive UI, Offline support, Multi-currency support
      </ListItem>
    </List>

    <Paragraph>
      Nexxo streamlines the often complicated process of managing shared
      expenses in groups, whether for trips, shared housing, or regular
      activities. The app ensures everyone stays informed about their financial
      obligations and makes settling up quick and easy.
    </Paragraph>
  </ArticleLayout>
);

export default Work;
