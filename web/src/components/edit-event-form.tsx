'use client';

import { Container, Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import InputField from './input-field';
import { useUpdateEvent } from '@nvl/hooks/use-update-event';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';

type EditEventFormProps = {
  event: {
    id: number;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    venue: string;
  };
};

type FormValues = EditEventFormProps['event'];

const InputDateTimeLocalFormat = "yyyy-MM-dd'T'HH:mm:ss";

export const EditEventForm = (props: EditEventFormProps) => {
  const router = useRouter();
  const { update, error } = useUpdateEvent();

  console.log({
    startTime: props.event.startTime,
    endTime: props.event.endTime,
  });

  const initialValues = {
    id: props.event.id,
    name: props.event.name,
    description: props.event.description,
    startTime: DateTime.fromISO(props.event.startTime).toFormat(
      InputDateTimeLocalFormat,
    ),
    endTime: DateTime.fromISO(props.event.endTime).toFormat(
      InputDateTimeLocalFormat,
    ),
    venue: props.event.venue,
  };

  const onSubmit = (values: FormValues) => {
    update({
      eventId: props.event.id,
      input: {
        name: values.name,
        description: values.description,
        startTime: DateTime.fromFormat(
          values.startTime,
          InputDateTimeLocalFormat,
        ).toISO(),
        endTime: DateTime.fromFormat(
          values.endTime,
          InputDateTimeLocalFormat,
        ).toISO(),
        venue: values.venue,
      },
    });

    if (error) {
      return;
    }
    router.push(`/events/${props.event.id}`);
  };

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Box w="40%" minW="300px" mx="auto">
            <Form>
              <InputField
                name="name"
                placeholder="Event name"
                label="Event Name"
                required
              />
              <InputField
                name="description"
                placeholder="Event description"
                label="Description"
                required
              />
              <InputField
                name="venue"
                placeholder="Event venue"
                label="Event Venue"
                required
              />
              <InputField
                name="startTime"
                label="Event Start"
                type="datetime-local"
                required
              />
              <InputField
                name="endTime"
                label="Event End"
                type="datetime-local"
                required
              />
              <Flex justify="center">
                <Button
                  mt={6}
                  type="submit"
                  loading={isSubmitting}
                  color="#f3f3f3"
                  bg="#130487"
                  _hover={{ backgroundColor: '#93a0c7', color: '#000' }}
                >
                  Update Event
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </Container>
  );
};
