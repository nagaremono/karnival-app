import { useMutation } from '@tanstack/react-query';
import { authClient } from '@nvl/auth/auth-client';

export function useSignOut() {
  const signOut = async () => {
    const res = await authClient.signOut();

    if (res.error) {
      throw res.error;
    }
  };
  const { mutate, isError, status } = useMutation({
    mutationKey: ['auth'],
    mutationFn: signOut,
  });

  return {
    signOut: mutate,
    isError,
    status,
  };
}
