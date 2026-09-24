import { NextPage } from 'next';
import { ArticleLayout } from '../layouts/Article';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import { EmailIcon } from '@chakra-ui/icons';
import { useTranslation } from '../lib/dictionaries';

const Contact: NextPage = () => {
  const toast = useToast();
  const t = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target) {
      emailjs
        .sendForm(
          'service_jwfz3ft',
          'template_bfnjrww',
          e.target,
          '6tBakpe3jeWHb7uG7'
        )
        .then(
          (result) => {
            toast({
              title: t.contact.successTitle,
              description: t.contact.successDesc,
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          },
          (error) => {
            console.log(error.text);
            toast({
              title: t.contact.errorTitle,
              description: t.contact.errorDesc,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          }
        );

      // e.target.reset();
    }
  };

  return (
    <ArticleLayout title={t.meta.contactTitle}>
      <Container>
        <Card>
          <CardHeader>
            <Heading textAlign="center">{t.contact.heading}</Heading>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <Flex mb="6" gap={8}>
                <Input
                  name="name"
                  variant="flushed"
                  placeholder={t.contact.name}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  variant="flushed"
                  placeholder={t.contact.email}
                  required
                />
              </Flex>

              <Textarea
                placeholder={t.contact.message}
                name="message"
                required
              />
              <Center mt="6" w="full">
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="teal"
                  type="submit"
                >
                  {t.contact.send}
                </Button>
              </Center>
            </form>
          </CardBody>
        </Card>
      </Container>
    </ArticleLayout>
  );
};

export default Contact;
