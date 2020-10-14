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
      <Heading mt={6} mb={10} w="75%" mx="auto">
        Event Details
      </Heading>
      <Flex mx="auto" w="75%" justifyContent="space-evenly">
        <Box
          boxShadow="0px 0px 14px 1px #2B2559"
          p={6}
          border="5px solid #7785AC"
          width="60%"
        >
          <Heading mb={4} as="h3" textAlign="center">
            {data?.agenda.name}
          </Heading>
          <ParticipatingStatus agenda={data?.agenda} />
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
            <Flex justifyContent="flex-end">
              <EditDeleteButtons
                agendaId={data?.agenda.id as number}
                organizerId={data?.agenda.organizerId as number}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          width="30%"
          p={4}
          boxShadow="0px 0px 14px 1px #2B2559"
          border="3px solid #A5E6BA"
          height="max-content"
        >
          <Heading as="h3" mb={2}>
            Participants
          </Heading>
          <List spacing={2}>
            {data?.agenda.participation.map((p) => {
              return (
                <ListItem key={p.userId} pl={4} fontSize="1.3rem">
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
