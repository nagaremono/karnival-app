import {
  Box,
  Heading,
  Badge,
  // Divider,
  Grid,
  Text,
  // Link,
  // Flex,
} from '@chakra-ui/react';
import React from 'react';
// import NextLink from 'next/link';
// import { ParticipatingStatus } from './ParticipatingStatus';
// import EditDeleteButtons from './EditDeleteButtons';

export type EventCardProps = {
  agenda: {
    name: string;
    organizer: {
      username: string;
    };
    description: string;
    venue: string;
    startTime: Date;
    endTime: Date;
  };
};

const EventCard = ({ agenda }: EventCardProps) => {
  return (
    <Box
      borderWidth="5px"
      borderStyle="solid"
      borderColor="#2b2559"
      boxShadow="md"
      p={4}
      color="#EFECCA"
    >
      {/* <NextLink */}
      {/*   href={{ */}
      {/*     pathname: '/event/[id]', */}
      {/*     query: { id: agenda?.id.toString() }, */}
      {/*   }} */}
      {/* > */}
      {/*   <Link> */}
      <Heading textStyle="xl" mb={2}>
        {agenda.name}
      </Heading>
      {/*   </Link> */}
      {/* </NextLink> */}

      <Text mb={2} as="span" textStyle="l">
        Organized by <Badge size="md">{agenda.organizer.username}</Badge>
      </Text>
      {/* <EditDeleteButtons */}
      {/*   agendaId={agenda.id} */}
      {/*   organizerId={agenda.organizerId} */}
      {/* /> */}
      {/* <Divider borderWidth="3px" /> */}
      <Grid
        mt={4}
        gap={2}
        templateColumns="repeat(2, minmax(0, 1fr))"
        textStyle="md"
      >
        <Text gridColumn="1 / -1">
          {agenda.description.slice(0, 150) +
            (agenda.description.length > 150 ? '...' : '')}
        </Text>
        <Text gridColumn="1 / -1">Venue: {agenda.venue}</Text>
        {[agenda.startTime, agenda.endTime].map((time, i) => {
          return (
            <Text key={i}>
              Start:{' '}
              {new Date(time).toLocaleString('en-US', {
                timeZone: 'Asia/Jakarta',
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </Text>
          );
        })}
      </Grid>
      {/* <ParticipatingStatus agenda={agenda} /> */}
    </Box>
  );
};

export default EventCard;
