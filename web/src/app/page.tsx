import AppBar from '@karnival/components/app-bar';
import { EventList } from '@karnival/components/event-list';
import { agendasQuery } from '@karnival/graphql/queries';
import { QueryClient } from '@tanstack/react-query';
import { execute } from '@karnival/repository';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['agendas'],
    queryFn: () => execute(agendasQuery, [{}]),
  });

  return (
    <main>
      <AppBar />
      <EventList />
    </main>
  );
}
