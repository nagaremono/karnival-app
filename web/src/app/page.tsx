import AppBar from '@nvl/components/app-bar';
import { EventList } from '@nvl/components/event-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getEvents } from '@nvl/repository';
import { AgendasQuery } from '@nvl/graphql/graphql';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam }) => getEvents(10, pageParam, true),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: AgendasQuery['agendas']) => {
      if (!lastPage) return null;
      if (lastPage.length < 10) return null;
      return lastPage ? lastPage[lastPage.length - 1].startTime : null;
    },
  });

  return (
    <main>
      <AppBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EventList />
      </HydrationBoundary>
    </main>
  );
}
