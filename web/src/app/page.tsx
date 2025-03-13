import EventCard, { EventCardProps } from '@karnival/components/event-card';

export default function Home() {
  const agenda: EventCardProps['agenda'] = {
    name: 'Event A',
    organizer: {
      username: 'Admin',
    },
    description: 'An example event',
    venue: 'A wonderful venue',
    startTime: new Date(),
    endTime: new Date(),
  };

  return (
    <main>
      <EventCard agenda={agenda} />
    </main>
  );
}
