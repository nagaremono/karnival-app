'use client';

import { getAgendas } from '@karnival/repository';
import { useQuery } from '@tanstack/react-query';
import EventCard from './event-card';

export function EventList() {
  const { data } = useQuery({
    queryKey: ['agendas'],
    queryFn: () => getAgendas(),
  });

  return <>{data && data.map((d) => <EventCard key={d.id} agenda={d} />)}</>;
}
