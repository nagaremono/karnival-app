import { Flex, IconButton, Link } from '@chakra-ui/core';
import React from 'react';
import { useDeleteAgendaMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface EditDeleteButtonsProps {
  agendaId: number;
  organizerId: number;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  agendaId,
  organizerId,
}) => {
  const { data } = useMeQuery();
  const [deleteAgenda] = useDeleteAgendaMutation();
  const router = useRouter();

  console.log(organizerId, agendaId);

  return (
    <Flex mt={2} width="100%" justifyContent="flex-end">
      {data?.me?.id === organizerId ? (
        <>
          <IconButton
            size="md"
            mr={2}
            fontSize="1.6rem"
            aria-label="Delete Event"
            icon="delete"
            onClick={() => {
              deleteAgenda({
                variables: { agendaId },
                update: (cache) => {
                  cache.evict({ id: 'Agenda:' + agendaId });
                },
              });
              if (router.asPath !== '/') {
                router.push('/');
              }
            }}
          />
          <NextLink
            href={{ pathname: '/event/edit/[id]', query: { id: agendaId } }}
          >
            <IconButton
              as={Link}
              mr={2}
              size="md"
              fontSize="1.6rem"
              aria-label="Edit Event"
              icon="edit"
            />
          </NextLink>
        </>
      ) : null}
    </Flex>
  );
};

export default EditDeleteButtons;
