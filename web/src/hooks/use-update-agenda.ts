import { AgendaInput } from '@nvl/graphql/graphql';
import { updateAgenda } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';

type Variables = {
  agendaId: number;
  input: AgendaInput;
};

export function useUpdateAgenda() {
  const { mutate, isError, error, status } = useMutation({
    mutationFn: (variables: Variables) =>
      updateAgenda(variables.agendaId, variables.input),
  });

  return {
    update: mutate,
    isError,
    error,
    status,
  };
}
