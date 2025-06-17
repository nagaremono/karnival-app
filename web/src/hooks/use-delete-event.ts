'use client';

import { deleteEvent } from '@nvl/repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteEvent() {
  const queryClient = useQueryClient();
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
