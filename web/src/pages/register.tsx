import { Formik, Form } from 'formik';
import AppBar from '../components/AppBar';
import InputField from '../components/InputField';
import { Button, Box, Flex } from '@chakra-ui/core';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

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
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables: values });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Box w="600px" mx="auto">
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
