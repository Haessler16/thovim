import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const InkDrop = () => {
  return (
    <ArticleLayout title="Simon dice">
      <Container>
        <Title>
          Simon dice <Badge>2018</Badge>
        </Title>

        <Paragraph>
          This is a famous game that most of us have been able to play once, so
          for this occasion, it seemed like a good challenge to recreate this
          incredible game.
        </Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://simon-dice-peach.vercel.app/">
              https://simon-dice-peach.vercel.app/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>

          <ListItem>
            <Meta>Stack</Meta>
            <span>HTML, CSS, Javacript</span>
          </ListItem>

          {/* <ListItem>
            <Meta>Blogpost</Meta>
            <Link href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820">
              How I’ve Attracted The First 500 Paid Users For My SaaS That Costs
              $5/mo <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
        </List>

        <WorkImage src="/images/works/simon-dice-start.png" alt="Start" />
        <WorkImage src="/images/works/simon-dice-end.png" alt="End" />
      </Container>
    </ArticleLayout>
  );
};

export default InkDrop;
