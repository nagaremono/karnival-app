import { useMutation } from '@tanstack/react-query';
import { authClient } from '@nvl/auth/auth-client';

type SignInParams = {
  email: string;
  password: string;
};

export function useSignIn() {
  const signIn = async (params: SignInParams) => {
    const res = await authClient.signIn.email({
      email: params.email,
      password: params.password,
      rememberMe: true,
    });

    if (res.error) {
      throw res.error;
    }
    return {
      userId: res.data.user.id,
    };
  };
  const { mutate, isError, status } = useMutation({
    mutationKey: ['auth'],
    mutationFn: signIn,
  });

  return {
    signIn: mutate,
    isError,
    status,
  };
}
