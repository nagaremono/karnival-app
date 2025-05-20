import { Box, Heading, Text, Container, Flex, List } from '@chakra-ui/react';
import AppBar from '@nvl/components/app-bar';
import { getAgendaDetail } from '@nvl/repository';
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

type AgendaDetailProps = {
  params: Promise<{
    agendaId: string;
  }>;
};

export default async function AgendaDetail({ params }: AgendaDetailProps) {
  const { agendaId } = await params;
  let fetchErr;
  let agenda;
  try {
    agenda = await getAgendaDetail(Number(agendaId));
  } catch (err) {
    fetchErr = err;
  }

  if (!agenda) {
    return (
      <main>
        <AppBar />
        <Container centerContent={true} p={8}>
          <Text textStyle={'2xl'}>Agenda is not found</Text>
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
      <Container>
        <Heading mt={6} mb={10} w={['90%', '80%']} mx="auto">
          Event Details
        </Heading>
        <Flex
          mx="auto"
          w={['90%', '80%']}
          wrap={['wrap']}
          justifyContent="space-evenly"
        >
          <Box
            boxShadow="0px 0px 14px 1px #2B2559"
            p={4}
            border="5px solid #7785AC"
            width={['90%', '80%', '50%']}
            mb={6}
          >
            <Heading mb={4} as="h3" fontSize="1.8rem" textAlign="center">
              {agenda.name}
            </Heading>
            {/* <ParticipatingStatus mb={2} agenda={.agenda} /> */}
            <Box>
              <EventDetailItem
                title="Event Organizer"
                text={agenda.organizer.username}
              />
              <EventDetailItem
                title="Event Description"
                text={agenda.description}
              />
              <EventDetailItem title="Event Venue" text={agenda.venue} />
              <EventDetailItem
                title="Event Start"
                text={new Date(agenda.startTime).toLocaleString('en-US', {
                  timeZone: 'Asia/Jakarta',
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              />
              <EventDetailItem
                title="Event End"
                text={new Date(agenda.endTime).toLocaleString('en-US', {
                  timeZone: 'Asia/Jakarta',
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              />
              {/* <EditDeleteButtons */}
              {/*   agendaId={agenda.id} */}
              {/*   organizerId={agenda.organizerId} */}
              {/* /> */}
            </Box>
          </Box>
          <Box
            width={['90%', '80%', '30%']}
            p={4}
            mb={6}
            boxShadow="0px 0px 14px 1px #2B2559"
            border="5px solid #A5E6BA"
            height="max-content"
          >
            <Heading w="100%" as="h3" mb={2} fontSize="1.8rem">
              Participants
            </Heading>
            <List.Root spaceX={2} spaceY={2}>
              {agenda.participation.map((p) => {
                return (
                  <List.Item key={p.userId} pl={4} fontSize="1.2rem">
                    <List.Indicator as={FiAtSign} />
                    {p.user?.username || ''}
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
