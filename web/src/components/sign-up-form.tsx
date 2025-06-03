'use client';
import { Container, Flex, Button } from '@chakra-ui/react';
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
    <Container mt={4}>
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
        {() => (
          <Form>
            <InputField name="username" label="Username" placeholder="" />
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
            <InputField
              name="repeatPassword"
              label="Repeat Password"
              placeholder=""
              type="password"
            />
            <Flex justify="center">
              <Button
                mt={6}
                type="submit"
                color="#f3f3f3"
                bg="#130487"
                _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
              >
                Sign Up
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignUpForm;
