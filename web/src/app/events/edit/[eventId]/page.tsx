import { Text, Container } from '@chakra-ui/react';
import React from 'react';
import { getAgendaDetail } from '@nvl/repository';
import AppBar from '@nvl/components/app-bar';
import { EditEventForm } from '@nvl/components/edit-event-form';
import { authClient } from '@nvl/auth/auth-client';
import { redirect } from 'next/navigation';

type EditEventProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export const EditEventPage = async ({ params }: EditEventProps) => {
  const { data: session } = await authClient.getSession();
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

  if (agenda.organizerId !== session?.user.id) {
    redirect(`/no-access`);
  }

  return (
    <>
      <AppBar />
      <EditEventForm event={agenda} />
    </>
  );
};

export default EditEventPage;
