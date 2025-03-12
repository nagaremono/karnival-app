import { Formik, Form } from 'formik';
import AppBar from '../components/AppBar';
import InputField from '../components/InputField';
import { Button, Box, Flex } from '@chakra-ui/react';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Longer than 4 characters please'),
  email: Yup.string().email('Enter valid email please'),
  password: Yup.string().min(5, 'I can guess a password that short'),
  confirmpassword: Yup.string().equals([Yup.ref('password')], 'Passwords does not match')
})

const Register: React.FC = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
      <AppBar />
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmpassword: '',
          email: '',
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              });
            },
          });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Box w={['80%', '60%', '40%', '25%']} mx="auto">
            <Form>
              <InputField
                name="username"
                placeholder="Your Username"
                label="Username"
              />
              <InputField
                name="email"
                placeholder="Your email"
                label="Email"
                type="email"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <InputField
                name="confirmpassword"
                placeholder="Type your password again"
                label="Confirm Password"
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
                  Register
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
