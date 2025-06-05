'use client';
import { Flex, IconButton, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useSession } from '@nvl/auth/auth-client';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

interface EditDeleteButtonsProps {
  eventId: number;
  organizerId: string;
}

export const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  eventId,
  organizerId,
}) => {
  const { data: session } = useSession();

  return (
    <Flex mt={2} width="100%" justifyContent="flex-end">
      {session?.user.id === organizerId && (
        <>
          <IconButton
            size="md"
            mr={2}
            fontSize="1.6rem"
            aria-label="Delete Event"
          >
            <MdDeleteOutline />
          </IconButton>
          <NextLink
            href={{ pathname: '/events/edit/[eventId]', query: { eventId } }}
          >
            <IconButton
              as={Link}
              mr={2}
              size="md"
              fontSize="1.6rem"
              aria-label="Edit Event"
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
