import { Formik, Form } from 'formik';
import AppBar from '../components/AppBar';
import InputField from '../components/InputField';
import { Button, Box, Flex, Divider, Text, Icon, Link } from '@chakra-ui/react';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { AiOutlineGithub } from 'react-icons/ai';

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <>
      <AppBar />
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              });
              cache.evict({ fieldName: 'agendas:{}' });
            },
          });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            typeof router.query.next === 'string'
              ? router.push(router.query.next)
              : router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Box w={['80%', '60%', '40%', '25%']} mx="auto">
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="Your Username or Email"
                label="Username or Email"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Flex justify="center">
                <Button
                  mt={6}
                  type="submit"
                  isLoading={isSubmitting}
                  color="#f3f3f3"
                  bg="#130487"
                  _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
                >
                  Login
                </Button>
              </Flex>
            </Form>
            <Divider my={4} />
            <Text as="p" textAlign="center" mb={2}>
              Or
            </Text>
            <Link
              href={`${
                process.env.NEXT_PUBLIC_BASE_API_URL as string
              }/auth/github`}
            >
              <Flex alignItems="center" color="#f3f3f3" bg="#1f1f1f" p={4}>
                <Icon as={AiOutlineGithub} boxSize={8} />
                <Text ml={2} as="p" verticalAlign="center">
                  Login with Github
                </Text>
              </Flex>
            </Link>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
