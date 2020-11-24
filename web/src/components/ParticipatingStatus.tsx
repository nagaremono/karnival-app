import { Flex, Badge, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useMeQuery,
  useToggleParticipationMutation,
} from '../generated/graphql';

export const ParticipatingStatus = ({ agenda }: any) => {
  const { data: meData } = useMeQuery();

  const [toggleParticipation, { loading }] = useToggleParticipationMutation({
    variables: {
      agendaId: agenda?.id,
      isParticipating: agenda?.isParticipating,
    },
    update: (cache, { data }) => {
      if (!meData?.me) {
        router.replace('/login?next=' + router.asPath);
      }

      if (!data?.toggleParticipation) return;

      cache.modify({
        id: cache.identify(agenda),
        fields: {
          isParticipating(current) {
            return !current;
          },
        },
      });
    },
  });

  const router = useRouter();

  return (
    <Flex mt={2} justifyContent="flex-end">
      {agenda?.isParticipating ? (
        <>
          <Badge
            display="flex"
            alignItems="center"
            px="10px"
            fontSize="1rem"
            variantColor="green"
            mx={2}
          >
            Participating
          </Badge>
          <Button
            isLoading={loading}
            mx={2}
            variantColor="red"
            onClick={() => toggleParticipation()}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={async () => toggleParticipation()} isLoading={loading}>
          Participate
        </Button>
      )}
    </Flex>
  );
};
