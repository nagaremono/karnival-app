'use client';
import { AgendaInput, CreateAgendaMutation } from '@nvl/graphql/graphql';
import { createEvent } from '@nvl/repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type EventInput = AgendaInput;

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isError, isPending, status } = useMutation({
    mutationFn: (variables: EventInput) => createEvent(variables),
    onSuccess: (data: CreateAgendaMutation) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/events/' + encodeURIComponent(data.createAgenda.id));
    },
  });

  return {
    mutate,
    isError,
    isPending,
    status,
  };
}
