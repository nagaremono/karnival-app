'use client';
import { Flex, Badge, Button } from '@chakra-ui/react';
import React from 'react';
import type { Agenda as Event } from '@nvl/graphql/graphql';
import { useToggleParticipation } from '@nvl/hooks/use-toggle-participation';
import { useSession } from '@nvl/auth/auth-client';
import { useRouter } from 'next/navigation';

type ParticipatingStatusProps = {
  event: Pick<Event, 'id' | 'isParticipating'>;
};

export const ParticipatingStatus = ({ event }: ParticipatingStatusProps) => {
  const { toggle, isPending } = useToggleParticipation();
  const router = useRouter();
  const { data: session } = useSession();

  const onParticipateClick = () => {
    if (!session?.session) {
      router.replace('/auth/sign-in?next=' + encodeURIComponent('/'));
      return;
    }
    toggle({
      eventId: event.id,
      isParticipating: event.isParticipating,
    });
  };

  return (
    <Flex mt={2}>
      {event.isParticipating && (
        <>
          <Badge
            display="flex"
            alignItems="center"
            px="10px"
            fontSize="1rem"
            colorScheme="green"
            mx={2}
          >
            Participating
          </Badge>
          <Button
            loading={isPending}
            mx={2}
            colorPalette={'red'}
            variant={'subtle'}
            onClick={onParticipateClick}
          >
            Cancel
          </Button>
        </>
      )}
      {!event.isParticipating && (
        <Button onClick={onParticipateClick} loading={isPending}>
          Participate
        </Button>
      )}
    </Flex>
  );
};
