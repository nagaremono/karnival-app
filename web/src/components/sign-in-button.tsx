'use client';

import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <Button position="initial" onClick={() => signIn('cognito')}>
      Register/Login
    </Button>
  );
}

export default SignInButton;
