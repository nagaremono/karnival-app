'use client';

import { deleteEvent } from '@nvl/repository';
import { useMutation } from '@tanstack/react-query';

export function useDeleteEvent() {
  const { mutate, isError, status, reset, error } = useMutation({
    mutationFn: deleteEvent,
  });

  return {
    deleteEvent: mutate,
    isError,
    status,
    reset,
    error,
  };
}
