import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const InkDrop = () => {
  return (
    <ArticleLayout title="Marvel Angular">
      <Container>
        <Title>
          Marvel Angular <Badge>2020</Badge>
        </Title>

        <Paragraph>
          I am a geek, so you should know that I would do this page, Marvel
          Angular is a page made with Angular where I show all the Marvel API
          data. For example characters, series, comics and authors
        </Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://marvel-angular.vercel.app/">
              https://marvel-angular.vercel.app/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>Platform</Meta>
            <span>Web / Mobile</span>
          </ListItem>

          <ListItem>
            <Meta>Stack</Meta>
            <span>Angular, Material, SASS, Marvel API</span>
          </ListItem>

          {/* <ListItem>
            <Meta>Blogpost</Meta>
            <Link href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820">
              How I’ve Attracted The First 500 Paid Users For My SaaS That Costs
              $5/mo <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
        </List>
        <WorkImage src="/images/works/marvel-angular-ch.png" alt="Chracter" />
        <WorkImage src="/images/works/marvel-angular-comics.png" alt="Comics" />
      </Container>
    </ArticleLayout>
  );
};

export default InkDrop;
