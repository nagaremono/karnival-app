'use client';

import { getEvents } from '@nvl/repository';
import { useInfiniteQuery } from '@tanstack/react-query';
import EventCard from './event-card';
import { Button, Container, Grid } from '@chakra-ui/react';
import { Fragment } from 'react';

export function EventList() {
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['events'],
      queryFn: ({ pageParam }) => getEvents(10, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return null;
        if (lastPage.length < 10) return null;
        return lastPage ? lastPage[lastPage.length - 1].startTime : null;
      },
    });

  return (
    <Container
      maxW={{ base: 'sm', md: 'lg', lg: '4xl', xl: '5xl' }}
      centerContent={true}
      my={8}
    >
      <Grid
        gap={{ base: 6, xl: 8 }}
        templateColumns={{ lg: 'repeat(2, minmax(0, 1fr))' }}
      >
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.map((event) => <EventCard key={event.id} event={event} />)}
          </Fragment>
        ))}
      </Grid>
      <Button
        my={8}
        textStyle={'lg'}
        fontWeight={'semibold'}
        onClick={() => fetchNextPage()}
        loading={isFetching && isFetchingNextPage}
        disabled={!hasNextPage}
      >
        Load more
      </Button>
    </Container>
  );
}
