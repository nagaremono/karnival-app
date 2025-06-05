import { AgendaInput } from '@nvl/graphql/graphql';
import { createEvent } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';

type EventInput = AgendaInput;

export function useCreateEvent() {
  const { mutate, isError, status } = useMutation({
    mutationFn: (variables: EventInput) => createEvent(variables),
  });

  return {
    mutate,
    isError,
    status,
  };
}
