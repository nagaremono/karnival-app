import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import AppBar from '../components/AppBar';
import { useAgendasQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  const { data, error, loading } = useAgendasQuery({
    variables: {
      limit: 50,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
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
              <Box
                border="5px solid #2b2559"
                boxShadow="0px 9px 21px 2px rgba(0,0,0,0.32)"
                p={4}
                key={agenda.id}
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
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
