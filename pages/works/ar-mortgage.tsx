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
    <ArticleLayout title="AR Mortgage">
      <Title>AR Mortgage Team</Title>

      <Paragraph>{t.workPages.arMortgage.p1}</Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>{t.worksDetails.website}</Meta>
          <Link href="https://www.armortgageteam.net/" target="_blank">
            https://www.armortgageteam.net/ <ExternalLinkIcon mx={2} />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.stack}</Meta>
          Wix, Custom CSS, Custom HTML, Custom JavaScript
        </ListItem>
        <ListItem>
          <Meta>{t.worksDetails.platform}</Meta>
          Web, Mobile
        </ListItem>
      </List>

      <Section delay={'0.1'}>
        <AspectRatio maxW="640px" ratio={1.7} my={4}>
          <Image src="/images/works/ao_home.jpeg" alt="AR Mortgage Interface" />
        </AspectRatio>
      </Section>

      <Paragraph>{t.workPages.arMortgage.p2}</Paragraph>

      <List ml={4} my={4}>
        <ListItem>
          <Badge mr={2}>{t.workPages.arMortgage.badge1}</Badge>
          {t.workPages.arMortgage.badge1Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.arMortgage.badge2}</Badge>
          {t.workPages.arMortgage.badge2Desc}
        </ListItem>
        <ListItem>
          <Badge mr={2}>{t.workPages.arMortgage.badge3}</Badge>
          {t.workPages.arMortgage.badge3Desc}
        </ListItem>
      </List>
    </ArticleLayout>
  );
};

export default Work;
