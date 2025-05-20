'use client';

import { Button, Container, Flex, Input, Field } from '@chakra-ui/react';
import AppBar from '@nvl/components/app-bar';
import { Form, Formik, useField } from 'formik';
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

// type FormValues = {
//   name: string;
//   description: string;
//   startTime: string;
//   endTime: string;
//   venue: string;
// };

export default function NewEvent() {
  return (
    <>
      <AppBar />
      <Container mt={4}>
        <Formik
          initialValues={{
            name: '',
            description: '',
            startTime: '',
            endTime: '',
            venue: '',
          }}
          onSubmit={async (values: Record<string, unknown>) => {
            console.log(JSON.stringify(values));
          }}
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
              />
              <InputField
                name="endTime"
                label="Event End"
                placeholder="Ends at..."
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
    </>
  );
}
