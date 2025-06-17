'use client';
import { Flex, Badge, Button } from '@chakra-ui/react';
import React from 'react';
import type { Agenda as Event } from '@nvl/graphql/graphql';
import { useToggleParticipation } from '@nvl/hooks/use-toggle-participation';

type ParticipatingStatusProps = {
  event: Pick<Event, 'id' | 'isParticipating'>;
};

export const ParticipatingStatus = ({ event }: ParticipatingStatusProps) => {
  const { toggle, isPending } = useToggleParticipation();

  console.log('PS', event);

  return (
    <Flex mt={2} justifyContent="flex-end">
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
            onClick={() =>
              toggle({
                eventId: event.id,
                isParticipating: event.isParticipating,
              })
            }
          >
            Cancel
          </Button>
        </>
      )}
      {!event.isParticipating && (
        <Button
          onClick={async () =>
            toggle({
              eventId: event.id,
              isParticipating: event.isParticipating,
            })
          }
          loading={isPending}
        >
          Participate
        </Button>
      )}
    </Flex>
  );
};
