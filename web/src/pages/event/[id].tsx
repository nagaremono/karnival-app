import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import AppBar from '../../components/AppBar';
import EventDetailItem from '../../components/EventDetailItem';
import { ParticipatingStatus } from '../../components/ParticipatingStatus';
import { useAgendaQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import EditDeleteButtons from '../../components/EditDeleteButtons';

const Event = ({}) => {
  const router = useRouter();
  const agendaIntId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  const { data, error, loading } = useAgendaQuery({
    skip: agendaIntId === -1,
    variables: { agendaId: agendaIntId },
  });

  if (error && !loading) {
    return (
      <Box>
        <Heading>There's an error</Heading>
        <Text>{error.message}</Text>
      </Box>
    );
  }

  return (
    <>
      <AppBar />
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
            {data?.agenda.name}
          </Heading>
          <ParticipatingStatus mb={2} agenda={data?.agenda} />
          <Box>
            <EventDetailItem
              title="Event Organizer"
              text={data?.agenda.organizer.username}
            />
            <EventDetailItem
              title="Event Description"
              text={data?.agenda.description}
            />
            <EventDetailItem title="Event Venue" text={data?.agenda.venue} />
            <EventDetailItem
              title="Event Start"
              text={
                new Date(data?.agenda.startTime).toLocaleString('id-ID', {
                  timeZone: 'Asia/Jakarta',
                }) + ' WIB'
              }
            />
            <EventDetailItem
              title="Event End"
              text={
                new Date(data?.agenda.endTime).toLocaleString('id-ID', {
                  timeZone: 'Asia/Jakarta',
                }) + ' WIB'
              }
            />
            <EditDeleteButtons
              agendaId={data?.agenda.id as number}
              organizerId={data?.agenda.organizerId as number}
            />
          </Box>
        </Box>
        <Box
          width={['90%', '80%', '30%']}
          p={4}
          mb={6}
          boxShadow="0px 0px 14px 1px #2B2559"
          border="3px solid #A5E6BA"
          height="max-content"
        >
          <Heading w="100%" as="h3" mb={2} fontSize="1.8rem">
            Participants
          </Heading>
          <List spacing={2}>
            {data?.agenda.participation.map((p) => {
              return (
                <ListItem key={p.userId} pl={4} fontSize="1.2rem">
                  <ListIcon icon="at-sign" />
                  {p.user!.username}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Flex>
    </>
  );
};

export default withApollo({ ssr: true })(Event);
