import { gql } from '@apollo/client';
import { Flex, Badge, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useParticipateMutation,
  useCancelParticipateMutation,
  MeQuery,
} from '../generated/graphql';

export const ParticipatingStatus = ({ agenda }: any) => {
  const [participate, { loading }] = useParticipateMutation();
  const [
    cancelParticipate,
    { loading: cancelLoading },
  ] = useCancelParticipateMutation();

  const router = useRouter();
  return (
    <Flex mt={2} justifyContent="flex-end">
      {agenda?.isParticipating ? (
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
                router.replace('/login?next=' + router.asPath);
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
              router.replace('/login?next=' + router.asPath);
            }
          }}
          isLoading={loading}
        >
          Participate
        </Button>
      )}
    </Flex>
  );
};
