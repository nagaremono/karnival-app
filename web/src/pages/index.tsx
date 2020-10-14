import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import AppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
import { useAgendasQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

const Index = () => {
  const { data, error, loading, fetchMore, variables } = useAgendasQuery({
    variables: {
      limit: 4,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const router = useRouter();

  if (!loading && !data) {
    return (
      <div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <>
      <AppBar />
      <Flex
        h="650px"
        bgImage="url('./front2.jpg')"
        backgroundRepeat="no-repeat"
        bgSize="cover"
        bgPos="center"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Flex
          w="75%"
          flexDirection="column"
          h="25%"
          justifyContent="center"
          p={6}
          border="5px solid #72e1d1"
        >
          <Heading w="max-content" as="h1" fontSize="3.5rem">
            Welcome to Karnival
          </Heading>
          <Text fontSize="1.5rem" w="max-content">
            Find events and gatherings near you!
          </Text>
        </Flex>
        <Text
          color="#fff"
          fontSize="1.2rem"
          position="absolute"
          bottom="0"
          right="0"
          as="span"
        >
          Photo by{' '}
          <a href="https://unsplash.com/@rachellynette?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Rachel Coyne
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/s/photos/event?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </Text>
      </Flex>
      <Box
        borderRight="3px solid #FF934F"
        borderLeft="3px solid #FF934F"
        my={8}
        px={6}
        w="75%"
        mx="auto"
      >
        <Heading mb={4}>Upcoming Events and Gatherings</Heading>
        {!data && loading ? (
          <Box>Loading...</Box>
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={8} p={4}>
            {data?.agendas?.map((agenda) => (
              <EventCard router={router} key={agenda.id} agenda={agenda} />
            ))}
          </Grid>
        )}
        {data ? (
          <Flex my={4} justifyContent="center">
            <Button
              isLoading={loading}
              onClick={() => {
                console.log(
                  data!.agendas![data!.agendas!.length - 1].startTime
                );
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor: data!.agendas![data!.agendas!.length - 1].startTime,
                  },
                });
              }}
              variantColor="green"
            >
              More Events
            </Button>
          </Flex>
        ) : null}
      </Box>
      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(Index);
