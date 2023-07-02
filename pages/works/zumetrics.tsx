import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const InkDrop = () => {
  return (
    <ArticleLayout title="Zumetrics">
      <Container>
        <Title>
          Zumetrics <Badge>2020</Badge>
        </Title>

        <Paragraph>
          A Markdown note-taking app with 100+ plugins, cross-platform and
          encrypted data sync support. The life-time revenue is more than $200k.
        </Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://my.zumetrics.vercel.app/" target="_blank">
              https://my.zumetrics.vercel.app/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>Platform</Meta>
            <span>Web / Movil / Desktop</span>
          </ListItem>

          <ListItem>
            <Meta>Stack</Meta>
            <span>React, NextJS, NodeJS, Express, GraphQl, MongoDB</span>
          </ListItem>

          {/* <ListItem>
            <Meta>Blogpost</Meta>
            <Link href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820">
              How I’ve Attracted The First 500 Paid Users For My SaaS That Costs
              $5/mo <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
        </List>

        <WorkImage src="/images/works/zumetrics-full.jpg" alt="Logo" />
        <WorkImage src="/images/works/zumetrics-login.png" alt="Login" />
      </Container>
    </ArticleLayout>
  );
};

export default InkDrop;
