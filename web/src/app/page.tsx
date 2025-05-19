import AppBar from '@karnival/components/app-bar';
import { EventList } from '@karnival/components/event-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAgendas } from '@karnival/repository';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
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
    <main>
      <AppBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EventList />
      </HydrationBoundary>
    </main>
  );
}
