import { AgendaInput } from '@nvl/graphql/graphql';
import { createAgenda } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useCreateAgenda() {
  const { data } = useSession();
  const { mutate, isError, status } = useMutation({
    mutationFn: (variables: AgendaInput) => createAgenda(variables, data),
  });

  return {
    mutate,
    isError,
    status,
  };
}
