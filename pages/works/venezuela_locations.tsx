import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const InkDrop = () => {
  return (
    <ArticleLayout title="Venezuela Location">
      <Container>
        <Title>
          Venezuela Location <Badge>2023</Badge>
        </Title>

        <Paragraph>
          This is a public API designed to visualize the geographic data of
          Venezuela. Here you can see the name of the states, municipalities and
          parishes.
        </Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://venezuela-locations-website.vercel.app/">
              https://venezuela-locations-website.vercel.app/{' '}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>Platform</Meta>
            <span>Web / Mobile / Desktop</span>
          </ListItem>

          <ListItem>
            <Meta>Stack</Meta>
            <span>React, Next.js, y Turporepo</span>
          </ListItem>

          {/* <ListItem>
            <Meta>Blogpost</Meta>
            <Link href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820">
              How I’ve Attracted The First 500 Paid Users For My SaaS That Costs
              $5/mo <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
        </List>

        <WorkImage src="/images/works/ven-location.png" alt="Logo" />
        <WorkImage src="/images/works/ven-location-dash.png" alt="Login" />
      </Container>
    </ArticleLayout>
  );
};

export default InkDrop;
