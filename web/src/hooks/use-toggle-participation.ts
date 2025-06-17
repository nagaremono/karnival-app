import { toggleParticipation } from '@nvl/repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ToggleParticipationInput = {
  eventId: number;
  isParticipating: boolean;
};

export function useToggleParticipation() {
  const queryClient = useQueryClient();
  const { mutate, isError, status, isPending } = useMutation({
    mutationFn: async (variables: ToggleParticipationInput) =>
      toggleParticipation(variables.eventId),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    toggle: mutate,
    isError,
    status,
    isPending,
  };
}
