import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { ArticleLayout } from '../layouts/Article';
import { Section } from '../components/Section';
import { GridItem } from '../components/GridItem';

import thumb500PaidUsers from '../public/images/contents/blog-500-paid-users.jpg';

const Posts = () => {
  return (
    <ArticleLayout title="Posts">
      <Container maxW="lg">
        <Heading as="h4" fontSize={20} mb={4}>
          Popular Posts
        </Heading>
        <Section delay={'0.1'}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title="My Fish workflow"
              thumbnail={thumb500PaidUsers}
              href="https://www.youtube.com/watch?v=KKxhf50FIPI"
            />
            <GridItem
              title="My desk setup (Late 2020)"
              thumbnail={thumb500PaidUsers}
              href="https://www.youtube.com/watch?v=1OFDMwDlnOE"
            />
          </SimpleGrid>
        </Section>

        <Section delay={'0.3'}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title="How I’ve Attracted The First 500 Paid Users For My SaaS That Costs $5/mo"
              thumbnail={thumb500PaidUsers}
              href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820"
            />
            <GridItem
              title="I stopped setting a financial goal for my SaaS"
              thumbnail={thumb500PaidUsers}
              href="https://blog.inkdrop.app/i-stopped-setting-a-financial-goal-for-my-saas-a92c3db65506"
            />
          </SimpleGrid>
        </Section>

        <Section delay={'0.5'}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title="How to Price Yourself as a Freelance Developer"
              thumbnail={thumb500PaidUsers}
              href="https://blog.inkdrop.app/how-to-price-yourself-as-a-freelance-developer-3453dfd59d91"
            />
            <GridItem
              title="I made my React Native app 50x faster"
              thumbnail={thumb500PaidUsers}
              href="https://www.youtube.com/watch?v=vj723NlrIQc"
            />
          </SimpleGrid>
        </Section>
      </Container>
    </ArticleLayout>
  );
};

export default Posts;
