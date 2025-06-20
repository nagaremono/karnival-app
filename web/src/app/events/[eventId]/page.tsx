import { Box, Heading, Text, Container, Flex, List } from '@chakra-ui/react';
import AppBar from '@nvl/components/app-bar';
import { EditDeleteButtons } from '@nvl/components/edit-delete-event-buttons';
import { getEventDetail } from '@nvl/repository';
import { FiAtSign } from 'react-icons/fi';

type EventDetailItemProps = {
  title?: string;
  text?: string;
};

const EventDetailItem: React.FC<EventDetailItemProps> = ({ title, text }) => {
  return (
    <Box mb={4}>
      <Heading fontSize="1.3rem" as="h4">
        {title}
      </Heading>
      <Text fontSize="1.1rem">{text}</Text>
    </Box>
  );
};

type EventDetailProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export default async function EventDetail({ params }: EventDetailProps) {
  const { eventId } = await params;
  const event = await getEventDetail(Number(eventId), true);

  if (!event) {
    return (
      <main>
        <AppBar />
        <Container centerContent={true} p={8}>
          <Text textStyle={'2xl'}>Event is not found</Text>
        </Container>
      </main>
    );
  }

  // if (!fetchErr) {
  //   return (
  //     <main>
  //       <AppBar />
  //       <Container>
  //         <Heading>There&aposs an error</Heading>
  //         <Text>{(fetchErr as any).message}</Text>
  //       </Container>
  //     </main>
  //   );
  // }

  return (
    <main>
      <AppBar />
      <Container centerContent={true}>
        <Heading my={8} w={['90%', '80%']} color="baseText" fontSize={24}>
          Event Details
        </Heading>
        <Flex w={['100%', '80%']} wrap={['wrap']} justifyContent="space-evenly">
          <Box
            p={4}
            bg="baseColor"
            color="baseText"
            border="5px solid"
            borderColor="cardBorder"
            width={['90%', '80%', '50%']}
            mb={6}
          >
            <Heading mb={4} as="h3" fontSize="1.8rem" textAlign="center">
              {event.name}
            </Heading>
            {/* <ParticipatingStatus mb={2} agenda={.agenda} /> */}
            <Box>
              <EventDetailItem
                title="Event Organizer"
                text={event.organizer.username}
              />
              <EventDetailItem
                title="Event Description"
                text={event.description}
              />
              <EventDetailItem title="Event Venue" text={event.venue} />
              <EventDetailItem
                title="Event Start"
                text={new Date(event.startTime).toLocaleString('en-US', {
                  timeZone: 'Asia/Jakarta',
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              />
              <EventDetailItem
                title="Event End"
                text={new Date(event.endTime).toLocaleString('en-US', {
                  timeZone: 'Asia/Jakarta',
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              />
            </Box>
            <Flex justifyContent={'end'}>
              <EditDeleteButtons
                eventId={event.id}
                organizerId={event.organizerId}
              />
            </Flex>
          </Box>
          <Box
            width={['90%', '80%', '30%']}
            p={4}
            mb={6}
            bg="baseColor"
            color="baseText"
            border="5px solid"
            borderColor="cardBorder"
            height="max-content"
          >
            <Heading w="100%" as="h3" mb={2} fontSize="1.8rem">
              Participants
            </Heading>
            <List.Root spaceY={1} variant={'plain'}>
              {event.participation.map((p) => {
                return (
                  <List.Item
                    key={p.userId}
                    fontSize="1.2rem"
                    fontWeight="semibold"
                    color={{ base: 'navyBlue', _dark: 'royalBlueLight' }}
                  >
                    <List.Indicator asChild mx={0}>
                      <FiAtSign />
                    </List.Indicator>
                    <Text>{p.user?.username || ''}</Text>
                  </List.Item>
                );
              })}
            </List.Root>
          </Box>
        </Flex>
      </Container>
    </main>
  );
}
