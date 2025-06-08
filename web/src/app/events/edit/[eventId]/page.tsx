import { Text, Container } from '@chakra-ui/react';
import React from 'react';
import { getEventDetail } from '@nvl/repository';
import AppBar from '@nvl/components/app-bar';
import { EditEventForm } from '@nvl/components/edit-event-form';

type EditEventProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export default async function EditEventPage({ params }: EditEventProps) {
  const { eventId } = await params;
  const event = await getEventDetail(Number(eventId));

  if (!event) {
    return (
      <main>
        <AppBar />
        <Container centerContent={true} p={8}>
          <Text textStyle={'2xl'}>Event is not found</Text>
        </Container>
      </main>
    );
  }

  return (
    <>
      <AppBar />
      <EditEventForm event={event} />
    </>
  );
}
