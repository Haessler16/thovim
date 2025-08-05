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
  <ArticleLayout title="AR Mortgage">
    <Title>AR Mortgage Team</Title>

    <Paragraph>
      A trusted partner in mortgage solutions, AR Mortgage Team specializes in
      shaping futures through strategic mortgage investments. The platform
      combines cutting-edge technology with personalized service to provide
      comprehensive mortgage solutions for various needs.
    </Paragraph>
    <List ml={4} my={4}>
      <ListItem>
        <Meta>Website</Meta>
        <Link href="https://www.armortgageteam.net/" target="_blank">
          https://www.armortgageteam.net/ <ExternalLinkIcon mx={2} />
        </Link>
      </ListItem>
      <ListItem>
        <Meta>Stack</Meta>
        Wix, Custom CSS, Custom HTML, Custom JavaScript
      </ListItem>
      <ListItem>
        <Meta>Platform</Meta>
        Web, Mobile
      </ListItem>
    </List>

    <Section delay={'0.1'}>
      <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <Image src="/images/works/ao_home.jpeg" alt="AR Mortgage Interface" />
      </AspectRatio>
    </Section>

    <Paragraph>
      Operating under PINNACLE CAPITAL HOME SOLUTIONS LLC, AR Mortgage Team
      offers a variety of qualified and nonqualified mortgages. The platform
      provides comprehensive loan products including conventional loans with
      flexible down payment options, FHA loans for those with average credit
      scores, and second mortgages for home equity utilization.
    </Paragraph>

    <List ml={4} my={4}>
      <ListItem>
        <Badge mr={2}>Loan Types</Badge>
        Conventional (3-20% down), FHA (3.5% down), Second Mortgages
      </ListItem>
      <ListItem>
        <Badge mr={2}>Services</Badge>
        Debt Consolidation, Home Improvement Financing
      </ListItem>
      <ListItem>
        <Badge mr={2}>Support</Badge>
        Professional Consultation, Flexible Appointments
      </ListItem>
    </List>
  </ArticleLayout>
);

export default Work;
