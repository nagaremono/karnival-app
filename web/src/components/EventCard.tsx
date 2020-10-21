import {
  Box,
  Heading,
  Badge,
  Divider,
  Grid,
  Text,
  Link,
  Flex,
} from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { ParticipatingStatus } from './ParticipatingStatus';
import EditDeleteButtons from './EditDeleteButtons';

const EventCard = ({ agenda, router }: any) => {
  return (
    <Box
      border="5px solid #2b2559"
      boxShadow="0px 9px 21px 2px rgba(0,0,0,0.32)"
      p={4}
      backgroundColor="#EFECCA"
    >
      <NextLink
        href={{
          pathname: '/event/[id]',
          query: { id: agenda.id.toString() },
        }}
      >
        <Link>
          <Heading fontSize="1.7rem" mb={2}>
            {agenda.name}
          </Heading>
        </Link>
      </NextLink>

      <Text mb={2} as="span" fontSize="1.2rem">
        Organized by{' '}
        <Badge fontSize="1.3rem">{agenda.organizer.username}</Badge>
      </Text>
      <EditDeleteButtons
        agendaId={agenda.id}
        organizerId={agenda.organizerId}
      />
      <Divider borderWidth="3px" />
      <Grid mt={4} gap={2} templateColumns="repeat(2, minmax(0, 1fr))">
        <Text fontSize="1.2rem" gridColumn="1 / -1">
          {agenda.description.slice(0, 150) + '...'}
        </Text>
        <Text fontSize="1.2rem" gridColumn="1 / -1">
          Venue: {agenda.venue}
        </Text>
        <Text fontSize="1.1rem">
          Start:{' '}
          {new Date(agenda.startTime).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
          })}
        </Text>
        <Text fontSize="1.1rem">
          End:{' '}
          {new Date(agenda.endTime).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
          })}
        </Text>
      </Grid>
      <ParticipatingStatus agenda={agenda} />
    </Box>
  );
};

export default EventCard;
