'use client';
import { Container, Flex, Button, Text } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik';
import InputField from './input-field';
import { useSignIn } from '@nvl/hooks/use-sign-in';
import { AuthErrorCode } from '@nvl/types/auth';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

type FormValues = {
  email: string;
  password: string;
};

type AuthError = {
  code?: string;
  message?: string;
  status: number;
  statusText: string;
};

function toFormError(error: AuthError): FormikErrors<FormValues> {
  if (error.code === AuthErrorCode.InvalidCreds) {
    return {
      email: 'Invalid email',
      password: 'Invalid password',
    };
  }

  return {
    email: '',
    password: '',
  };
}

export function SignInForm() {
  const { signIn, error } = useSignIn();
  const router = useRouter();
  const onSubmit = (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    signIn(values);
    if (error) {
      setErrors(toFormError(error as unknown as AuthError));
      return;
    }

    router.replace('/');
  };

  return (
    <Container mt={4} centerContent={true}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <InputField
              name="email"
              label="Email"
              placeholder=""
              type="email"
            />
            <InputField
              name="password"
              label="Password"
              placeholder=""
              type="password"
            />
            <Flex justify="center">
              <Button
                mt={6}
                type="submit"
                color="babyBlue"
                bg="royalBlueDark"
                _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
              >
                Sign In
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <Flex>
        <Text>Don&apos;t have an account?&nbsp;</Text>
        <NextLink href={'/auth/sign-up'}>
          <Text textDecor={'underline'}>Sign Up</Text>
        </NextLink>
      </Flex>
    </Container>
  );
}

export default SignInForm;
