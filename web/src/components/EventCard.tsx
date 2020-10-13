import { gql } from '@apollo/client';
import {
  Box,
  Heading,
  Badge,
  Divider,
  Grid,
  Text,
  Flex,
  Button,
} from '@chakra-ui/core';
import React from 'react';
import {
  MeQuery,
  useCancelParticipateMutation,
  useParticipateMutation,
} from '../generated/graphql';

const EventCard = ({ agenda, router }: any) => {
  const [participate, { loading }] = useParticipateMutation();
  const [
    cancelParticipate,
    { loading: cancelLoading },
  ] = useCancelParticipateMutation();
  return (
    <Box
      border="5px solid #2b2559"
      boxShadow="0px 9px 21px 2px rgba(0,0,0,0.32)"
      p={4}
      backgroundColor="#EFECCA"
    >
      <Heading mb={2}>{agenda.name}</Heading>
      <Text mb={2} as="span" fontSize="1.2rem">
        Organized by{' '}
        <Badge fontSize="1.3rem">{agenda.organizer.username}</Badge>
      </Text>
      <Divider borderWidth="3px" />
      <Grid mt={4} gap={4} templateColumns="repeat(2, 1fr)">
        <Text fontSize="1.5rem" gridColumn="1 / -1">
          {agenda.description}
        </Text>
        <Text fontSize="1.5rem" gridColumn="1 / -1">
          Venue: {agenda.venue}
        </Text>
        <Text fontSize="1.4rem">
          Start:{' '}
          {new Date(agenda.startTime).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
          })}
        </Text>
        <Text fontSize="1.4rem">
          End:{' '}
          {new Date(agenda.endTime).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
          })}
        </Text>
      </Grid>
      <Flex mt={2} justifyContent="flex-end">
        {agenda.isParticipating ? (
          <>
            <Badge
              display="flex"
              alignItems="center"
              px="10px"
              fontSize="1rem"
              variantColor="green"
              mx={2}
            >
              Participating
            </Badge>
            <Button
              isLoading={cancelLoading}
              mx={2}
              variantColor="red"
              onClick={async () => {
                const response = await cancelParticipate({
                  variables: { agendaId: agenda.id },
                  update: (cache) => {
                    const meData: MeQuery | null = cache.readQuery({
                      query: gql`
                        query Me {
                          me {
                            username
                            id
                          }
                        }
                      `,
                    });

                    if (!meData?.me) {
                      return;
                    } else {
                      cache.writeFragment({
                        id: 'Agenda:' + agenda.id,
                        fragment: gql`
                          fragment _ on Agenda {
                            isParticipating
                          }
                        `,
                        data: { isParticipating: false },
                      });
                    }
                  },
                });

                if (!response.data?.cancelParticipate) {
                  router.replace('/login?next=' + router.pathname);
                }
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={async () => {
              const response = await participate({
                variables: { agendaId: agenda.id },
                update: (cache) => {
                  const meData: MeQuery | null = cache.readQuery({
                    query: gql`
                      query Me {
                        me {
                          username
                          id
                        }
                      }
                    `,
                  });

                  if (!meData?.me) {
                    return;
                  } else {
                    cache.writeFragment({
                      id: 'Agenda:' + agenda.id,
                      fragment: gql`
                        fragment _ on Agenda {
                          isParticipating
                        }
                      `,
                      data: { isParticipating: true },
                    });
                  }
                },
              });

              if (!response.data?.participate) {
                router.replace('/login?next=' + router.pathname);
              }
            }}
            isLoading={loading}
          >
            Participate
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default EventCard;
