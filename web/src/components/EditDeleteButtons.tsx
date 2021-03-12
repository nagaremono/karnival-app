import { Flex, IconButton, Link } from '@chakra-ui/react';
import React from 'react';
import { useDeleteAgendaMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

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

  return (
    <Flex mt={2} width="100%" justifyContent="flex-end">
      {data?.me?.id === organizerId ? (
        <>
          <IconButton
            size="md"
            mr={2}
            fontSize="1.6rem"
            aria-label="Delete Event"
            icon={<DeleteIcon />}
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
              icon={<EditIcon />}
            />
          </NextLink>
        </>
      ) : null}
    </Flex>
  );
};

export default EditDeleteButtons;
