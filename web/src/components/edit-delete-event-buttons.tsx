'use client';
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useSession } from '@nvl/auth/auth-client';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useDeleteEvent } from '@nvl/hooks/use-delete-event';

interface EditDeleteButtonsProps {
  eventId: number;
  organizerId: string;
}

export const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  eventId,
  organizerId,
}) => {
  const { data: session } = useSession();
  const { deleteEvent, status } = useDeleteEvent();
  const onDelete = () => {
    deleteEvent(eventId);
  };

  return (
    <Flex mt={2} gapX={2}>
      {session?.user.id === organizerId && (
        <>
          <IconButton
            size="md"
            aria-label="Delete Event"
            onClick={onDelete}
            loading={status === 'pending'}
            colorPalette={'red'}
            variant={'subtle'}
          >
            <MdDeleteOutline />
          </IconButton>
          <NextLink href={`/events/edit/${eventId}`}>
            <IconButton
              size="md"
              aria-label="Edit Event"
              colorPalette={'border'}
              variant={'subtle'}
            >
              <FaEdit />
            </IconButton>
          </NextLink>
        </>
      )}
    </Flex>
  );
};

export default EditDeleteButtons;
