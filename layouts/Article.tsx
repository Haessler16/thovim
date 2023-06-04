import { motion } from 'framer-motion';
import Head from 'next/head';
import { GridItemStyle } from '../components/GridItem';
import { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 1, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

interface iArticleLayout {
  children?: ReactNode;
  title: string;
}

export const ArticleLayout = ({ children, title }: iArticleLayout) => {
  // console.log({ title, children });
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      {typeof title === 'string' && (
        <Head>
          <title>{title} - Haessler León</title>
        </Head>
      )}

      {children}
      <GridItemStyle />
    </motion.article>
  );
};
