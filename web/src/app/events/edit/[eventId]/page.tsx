import { Text, Container } from '@chakra-ui/react';
import React from 'react';
import { getAgendaDetail } from '@nvl/repository';
import AppBar from '@nvl/components/app-bar';
import { EditEventForm } from '@nvl/components/edit-event-form';

type EditEventProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export const EditEventPage = async ({ params }: EditEventProps) => {
  const { eventId } = await params;
  const agenda = await getAgendaDetail(Number(eventId));

  if (!agenda) {
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
      <EditEventForm event={agenda} />
    </>
  );
};

export default EditEventPage;
