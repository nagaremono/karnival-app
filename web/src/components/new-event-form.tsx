'use client';

import { Flex, Button, Container, Input, Field } from '@chakra-ui/react';
import { useCreateAgenda } from '@nvl/hooks/use-create-agenda';
import { Formik, Form, useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type,
}) => {
  const [field] = useField(name);

  return (
    <>
      <Field.Root required>
        <Field.Label>{label}</Field.Label>
        <Input placeholder={placeholder} type={type} {...field} />
        {/* <Field.ErrorText>This field is required</Field.ErrorText> */}
      </Field.Root>
    </>
  );
};

type FormValues = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  venue: string;
};

export function NewEventForm() {
  const { mutate } = useCreateAgenda();
  const onSubmit = (formValues: FormValues) => {
    mutate({
      ...formValues,
      startTime: new Date(formValues.startTime).toISOString(),
      endTime: new Date(formValues.endTime).toISOString(),
    });
  };

  return (
    <Container mt={4}>
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
                color="#f3f3f3"
                bg="#130487"
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
