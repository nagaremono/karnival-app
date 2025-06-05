import { AgendaInput } from '@nvl/graphql/graphql';
import { updateEvent } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';

type EventInput = AgendaInput;

type Variables = {
  eventId: number;
  input: EventInput;
};

export function useUpdateEvent() {
  const { mutate, isError, error, status } = useMutation({
    mutationFn: (variables: Variables) =>
      updateEvent(variables.eventId, variables.input),
  });

  return {
    update: mutate,
    isError,
    error,
    status,
  };
}
