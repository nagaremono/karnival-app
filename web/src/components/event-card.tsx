import {
  Box,
  Heading,
  Badge,
  // Divider,
  Grid,
  Text,
  // Link,
  // Flex,
  BoxProps,
  Separator,
} from '@chakra-ui/react';
import React from 'react';
import EditDeleteButtons from './edit-delete-event-buttons';
// import NextLink from 'next/link';
// import { ParticipatingStatus } from './ParticipatingStatus';
// import EditDeleteButtons from './EditDeleteButtons';

export type EventCardProps = {
  event: {
    id: number;
    name: string;
    organizer: {
      username: string;
    };
    description: string;
    venue: string;
    startTime: Date;
    endTime: Date;
    organizerId: string;
  };
} & BoxProps;

const EventCard = ({ event, ...boxProps }: EventCardProps) => {
  return (
    <Box
      borderWidth="5px"
      borderStyle="solid"
      borderColor="#2b2559"
      boxShadow="md"
      p={4}
      color="#EFECCA"
      {...boxProps}
    >
      {/* <NextLink */}
      {/*   href={{ */}
      {/*     pathname: '/event/[id]', */}
      {/*     query: { id: agenda?.id.toString() }, */}
      {/*   }} */}
      {/* > */}
      {/*   <Link> */}
      <Heading textStyle="xl" mb={2}>
        {event.name}
      </Heading>
      {/*   </Link> */}
      {/* </NextLink> */}

      <Text mb={2} as="span" textStyle="l">
        Organized by <Badge size="md">{event.organizer.username}</Badge>
      </Text>
      <EditDeleteButtons eventId={event.id} organizerId={event.organizerId} />
      <Separator variant={'solid'} size={'md'} />
      <Grid
        mt={4}
        gap={2}
        templateColumns="repeat(2, minmax(0, 1fr))"
        textStyle="md"
      >
        <Text gridColumn="1 / -1">
          {event.description.slice(0, 150) +
            (event.description.length > 150 ? '...' : '')}
        </Text>
        <Text gridColumn="1 / -1">Venue: {event.venue}</Text>
        {[event.startTime, event.endTime].map((time, i) => {
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
