import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';
import { useTranslation } from '../../lib/dictionaries';

const InkDrop = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Venezuela Location">
      <Container>
        <Title>
          Venezuela Location <Badge>2023</Badge>
        </Title>

        <Paragraph>{t.workPages.venLocations.p1}</Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t.worksDetails.website}</Meta>
            <Link href="https://venezuela-locations-website.vercel.app/">
              https://venezuela-locations-website.vercel.app/{' '}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>{t.worksDetails.platform}</Meta>
            <span>Web / Mobile / Desktop</span>
          </ListItem>

          <ListItem>
            <Meta>{t.worksDetails.stack}</Meta>
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
