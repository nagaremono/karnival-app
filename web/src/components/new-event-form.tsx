'use client';

import { Flex, Button, Container, Text, Spinner } from '@chakra-ui/react';
import { useCreateEvent } from '@nvl/hooks/use-create-event';
import { Formik, Form } from 'formik';
import InputField from './input-field';
import { useRouter } from 'next/navigation';
import { useSession } from '@nvl/auth/auth-client';
import { useEffect } from 'react';

type FormValues = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  venue: string;
};

const ONE_SECONDS = 1000;

export function NewEventForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useCreateEvent();
  const onSubmit = (formValues: FormValues) => {
    mutate({
      ...formValues,
      startTime: new Date(formValues.startTime).toISOString(),
      endTime: new Date(formValues.endTime).toISOString(),
    });
  };

  useEffect(() => {
    if (!session?.session) {
      setTimeout(() => {
        router.replace(
          '/auth/sign-in?next=' + encodeURIComponent('/events/new'),
        );
      }, ONE_SECONDS);
    }
  }, [router, session]);

  if (!session?.session) {
    return (
      <Container mt={4} centerContent={true}>
        <Spinner size="lg" color="colorPalette.600" colorPalette={'blue'} />
        <Text textStyle={'xl'} my={4}>
          You are not logged in, redirecting...
        </Text>
      </Container>
    );
  }

  return (
    <Container mt={4} centerContent={true}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          startTime: '',
          endTime: '',
          venue: '',
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <InputField
              name="name"
              label="Event Name"
              placeholder="Event name..."
            />
            <InputField
              name="description"
              label="Description"
              placeholder="Event description..."
              textArea={true}
            />
            <InputField
              name="venue"
              label="Venue"
              placeholder="Event venue..."
            />
            <InputField
              name="startTime"
              label="Event Start"
              placeholder="Starts at..."
              type="datetime-local"
            />
            <InputField
              name="endTime"
              label="Event End"
              placeholder="Ends at..."
              type="datetime-local"
            />
            <Flex justify="center">
              <Button
                mt={6}
                type="submit"
                color="babyBlue"
                bg="royalBlueDark"
                _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
              >
                Create New Event
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
