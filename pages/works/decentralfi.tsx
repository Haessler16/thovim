import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Meta, WorkImage, Title } from '../../components/WorksDetails';
import { Paragraph } from '../../components/Paragraph';
import { ArticleLayout } from '../../layouts/Article';
import { useTranslation } from '../../lib/dictionaries';

const InkDrop = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Decentrafi">
      <Container>
        <Title>
          DecentralFi <Badge>2021</Badge>
        </Title>

        <Paragraph>{t.workPages.decentralfi.p1}</Paragraph>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t.worksDetails.website}</Meta>
            <Link href="https://decentralfi.io/">
              https://decentralfi.io/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>

          <ListItem>
            <Meta>{t.worksDetails.platform}</Meta>
            <span>Web / Movil / Desktop</span>
          </ListItem>

          <ListItem>
            <Meta>{t.worksDetails.stack}</Meta>
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
