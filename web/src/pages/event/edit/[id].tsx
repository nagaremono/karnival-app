import { Box, Heading, Text, Button, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useAgendaQuery,
  useUpdateAgendaMutation,
} from '../../../generated/graphql';
import { useIsAuth } from '../../../utils/useIsAuth';
import AppBar from '../../../components/AppBar';
import { Formik, Form } from 'formik';
import InputField from '../../../components/InputField';
import { withApollo } from '../../../utils/withApollo';

const EditEvent = () => {
  useIsAuth();
  const router = useRouter();
  const agendaIntId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  const { data, error, loading } = useAgendaQuery({
    skip: agendaIntId === -1,
    variables: { agendaId: agendaIntId },
  });

  const [updateAgenda] = useUpdateAgendaMutation();

  if (error && !loading) {
    return (
      <Box width="40%" mx="auto">
        <Heading>There's an error</Heading>
        <Text>{error.message}</Text>
      </Box>
    );
  }

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!data) {
    <Box width="40%" mx="auto">
      <Heading>Not found</Heading>
    </Box>;
  }

  return (
    <>
      <AppBar />
      {data?.agenda ? (
        <Formik
          initialValues={{
            name: data!.agenda.name,
            description: data!.agenda.description,
            startTime: data!.agenda.startTime.slice(0, -8),
            endTime: data!.agenda.endTime.slice(0, -8),
            venue: data!.agenda.venue,
          }}
          onSubmit={async (values) => {
            const { errors } = await updateAgenda({
              variables: { input: values, agendaId: data!.agenda.id },
              update: (cache) => {
                cache.evict({ fieldName: 'agendas:{}' });
              },
            });

            if (!errors) {
              router.push('/');
            }
          }}
        >
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
                  textarea
                />
                <InputField
                  name="venue"
                  placeholder="Event venue"
                  label="Event Venue"
                  required
                />
                <InputField
                  name="startTime"
                  placeholder="Start time"
                  label="Event Start"
                  type="datetime-local"
                  required
                />
                <InputField
                  name="endTime"
                  placeholder="End Time"
                  label="Event End"
                  type="datetime-local"
                  required
                />
                <Flex justify="center">
                  <Button
                    mt={6}
                    type="submit"
                    isLoading={isSubmitting}
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
      ) : null}
    </>
  );
};

export default withApollo({ ssr: false })(EditEvent);
