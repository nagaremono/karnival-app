'use client';

import { getAgendas } from '@karnival/repository';
import { useInfiniteQuery } from '@tanstack/react-query';
import EventCard from './event-card';
import { Button, Container } from '@chakra-ui/react';
import { Fragment } from 'react';

export function EventList() {
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['agendas'],
      queryFn: ({ pageParam }) => getAgendas(10, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return null;
        if (lastPage.length < 10) return null;
        return lastPage ? lastPage[lastPage.length - 1].startTime : null;
      },
    });

  return (
    <Container maxW={'md'} centerContent={true} my={8}>
      {/* {data && */}
      {/*   data.pages.length > 0 && */}
      {/*   data.pages.map((d) => <EventCard key={d} agenda={d} my={4} />)} */}
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group?.map((agenda) => (
            <EventCard key={agenda.id} agenda={agenda} />
          ))}
        </Fragment>
      ))}
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
