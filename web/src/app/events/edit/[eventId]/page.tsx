import React from 'react';
import { getEventDetail } from '@nvl/repository';
import AppBar from '@nvl/components/app-bar';
import { EditEventForm } from '@nvl/components/edit-event-form';
import EventNotFoundCard from '@nvl/components/event-not-found-notify';

type EditEventProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export default async function EditEventPage({ params }: EditEventProps) {
  const { eventId } = await params;
  const event = await getEventDetail(Number(eventId));

  return (
    <main>
      <AppBar />
      {event ? <EditEventForm event={event} /> : <EventNotFoundCard />}
    </main>
  );
}
