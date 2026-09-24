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
import { useTranslation } from '../../lib/dictionaries';

const Work: NextPage = () => {
  const t = useTranslation();

  return (
    <ArticleLayout title="Aluxion with HLA">
      <Title>Grupo HLA Healthcare Platform</Title>

      <Paragraph>{t.workPages.aluxion.p1}</Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.website}</Meta>
          <Link href="https://www.grupohla.com/" target="_blank">
            https://www.grupohla.com/ <ExternalLinkIcon mx={2} />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.stack}</Meta>
          React, Next.js, TypeScript, NestJS, PostgreSQL, Docker.
        </ListItem>

        <ListItem>
          <Meta>{t.worksDetails.platform}</Meta>
          Web Portal & Mobile App
        </ListItem>
      </List>

      <Section delay={'0.1'}>
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
          <Image src="/images/works/hla_home.png" alt="HLA Digital Platform" />
        </AspectRatio>
      </Section>

      <Paragraph>{t.workPages.aluxion.p2}</Paragraph>

      <List ml={4} my={4}>
        <ListItem>
          <Badge mr={2}>{t.workPages.aluxion.badge1}</Badge>
          {t.workPages.aluxion.badge1Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.aluxion.badge2}</Badge>
          {t.workPages.aluxion.badge2Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.aluxion.badge3}</Badge>
          {t.workPages.aluxion.badge3Desc}
        </ListItem>
      </List>

      <Section delay={'0.2'}>
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
          <Image src="/images/works/grupo-hla.jpg" alt="Grupo HLA Network" />
        </AspectRatio>
      </Section>

      <Paragraph>{t.workPages.aluxion.p3}</Paragraph>
    </ArticleLayout>
  );
};

export default Work;
