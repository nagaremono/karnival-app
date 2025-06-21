'use client';
import { Box, Container, Flex, Button } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik';
import InputField from './input-field';
import { AuthErrorCode } from '@nvl/types/auth';
import { useSignUp } from '@nvl/hooks/use-sign-up';
import * as Yup from 'yup';

type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required().min(3).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  repeatPassword: Yup.string().equals(
    [Yup.ref('password')],
    'Password mismatch',
  ),
});

type AuthError = {
  code?: string;
  message?: string;
  status: number;
  statusText: string;
};

function toFormError(error: AuthError): FormikErrors<FormValues> {
  if (error.code === AuthErrorCode.UserExists) {
    return {
      email: 'Email taken',
    };
  }

  return {
    email: '',
    password: '',
  };
}

export function SignUpForm() {
  const { signUp, error } = useSignUp();
  const onSubmit = async (
    values: FormValues,
    { setErrors, validateForm }: FormikHelpers<FormValues>,
  ) => {
    await validateForm();
    signUp(values);
    if (error) {
      setErrors(toFormError(error as unknown as AuthError));
    }
  };

  return (
    <Container mt={4} centerContent={true}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          repeatPassword: '',
        }}
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}
      >
        {({ isSubmitting }) => (
          <Box w={{ base: '4/5', sm: '1/2', md: '2/5', lg: '1/5' }}>
            <Form>
              <InputField
                name="username"
                label="Username"
                placeholder=""
                mb={8}
              />
              <InputField
                name="email"
                label="Email"
                placeholder=""
                type="email"
                mb={8}
              />
              <InputField
                name="password"
                label="Password"
                placeholder=""
                type="password"
                mb={8}
              />
              <InputField
                name="repeatPassword"
                label="Repeat Password"
                placeholder=""
                type="password"
                mb={8}
              />
              <Flex justify="center">
                <Button
                  type="submit"
                  color="babyBlue"
                  bg="royalBlueDark"
                  _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
                  loading={isSubmitting}
                >
                  Sign Up
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default SignUpForm;
