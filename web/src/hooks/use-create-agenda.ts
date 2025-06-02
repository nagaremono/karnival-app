import { AgendaInput } from '@nvl/graphql/graphql';
import { createAgenda } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';

export function useCreateAgenda() {
  const { mutate, isError, status } = useMutation({
    mutationFn: (variables: AgendaInput) => createAgenda(variables),
  });

  return {
    mutate,
    isError,
    status,
  };
}
