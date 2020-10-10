import { Formik, Form } from 'formik';
import AppBar from '../components/AppBar';
import InputField from '../components/InputField';
import { Button, Box, Flex } from '@chakra-ui/core';

const Register: React.FC = () => {
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
        onSubmit={(values) => console.log(values)}
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

export default Register;
