import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';

const InkDrop = () => {
  return (
    <ArticleLayout title="Decentrafi">
      <Container>
        <Title>
          DecentralFi <Badge>2021</Badge>
        </Title>

        <Paragraph>
          Decentral is a decentralized web application, with the objective of
          carrying out transactions with cryptocurrency, creating and managing
          wallets, viewing market values and managing your liquidity on the
          thorchain platform.
        </Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://decentralfi.io/">
              https://decentralfi.io/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>Platform</Meta>
            <span>Web / Movil / Desktop</span>
          </ListItem>

          <ListItem>
            <Meta>Stack</Meta>
            <span>Angular, Django, Postgresql, Jest</span>
          </ListItem>
        </List>

        <WorkImage src="/images/works/decentralfi-landing.png" alt="Landing" />
        <WorkImage src="/images/works/last_preview.jpg" alt="DecentralFi" />
      </Container>
    </ArticleLayout>
  );
};

export default InkDrop;
