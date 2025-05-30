import { useMutation } from '@tanstack/react-query';
import { authClient } from '@nvl/auth/auth-client';

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

export function useSignUp() {
  const signUp = async (params: SignUpParams) => {
    const res = await authClient.signUp.email({
      email: params.email,
      password: params.password,
      name: params.username,
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
    mutationFn: signUp,
  });

  return {
    signUp: mutate,
    isError,
    status,
  };
}
