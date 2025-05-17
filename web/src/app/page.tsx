import AppBar from '@karnival/components/app-bar';
import { EventList } from '@karnival/components/event-list';
import { QueryClient } from '@tanstack/react-query';
import { getAgendas } from '@karnival/repository';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['agendas'],
    queryFn: () => getAgendas(),
  });

  return (
    <main>
      <AppBar />
      <EventList />
    </main>
  );
}
