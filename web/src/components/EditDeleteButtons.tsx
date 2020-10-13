import { Flex, IconButton } from '@chakra-ui/core';
import React from 'react';
import { useDeleteAgendaMutation, useMeQuery } from '../generated/graphql';

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

  console.log(organizerId, agendaId);

  return (
    <Flex width="20%" justifyContent="space-evenly">
      {data?.me?.id === organizerId ? (
        <>
          <IconButton
            size="md"
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
            }}
          />
          <IconButton
            size="md"
            fontSize="1.6rem"
            aria-label="Edit Event"
            icon="edit"
          />{' '}
        </>
      ) : null}
    </Flex>
  );
};

export default EditDeleteButtons;
