'use client';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { authClient } from '@nvl/auth/auth-client';
import { useRouter } from 'next/navigation';

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

export function useSignUp() {
  const queryClient = new QueryClient();
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
  const router = useRouter();
  const { mutate, isError, status, error, reset } = useMutation({
    mutationKey: ['auth'],
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.replace('/');
    },
    onError: () => {},
  });

  return {
    signUp: mutate,
    isError,
    status,
    error,
    reset,
  };
}
