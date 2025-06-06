'use client';

import { deleteEvent } from '@nvl/repository';
import { QueryClient, useMutation } from '@tanstack/react-query';

export function useDeleteEvent() {
  const queryClient = new QueryClient();
  const { mutate, isError, status, reset, error } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
  });

  return {
    deleteEvent: mutate,
    isError,
    status,
    reset,
    error,
  };
}
