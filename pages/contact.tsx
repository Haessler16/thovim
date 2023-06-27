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

const Contact: NextPage = () => {
  const toast = useToast();

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
            // console.log(result.text);
            toast({
              title: 'Message Send.',
              description: 'Your message was send successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          },
          (error) => {
            console.log(error.text);
            toast({
              title: 'Message Error.',
              description: 'Something wrong happend',
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
    <ArticleLayout title="Contact me">
      <Container>
        <Card>
          <CardHeader>
            <Heading textAlign="center">Send me a message!</Heading>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <Flex mb="6" gap={8}>
                <Input
                  name="name"
                  variant="flushed"
                  placeholder="Name"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  variant="flushed"
                  placeholder="example@corp.com"
                  required
                />
              </Flex>

              <Textarea placeholder="Message" name="message" required />
              <Center mt="6" w="full">
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="teal"
                  type="submit"
                >
                  Send
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
