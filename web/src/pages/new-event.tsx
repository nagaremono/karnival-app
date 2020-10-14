import { Formik, Form } from 'formik';
import AppBar from '../components/AppBar';
import InputField from '../components/InputField';
import { Button, Box, Flex } from '@chakra-ui/core';
import { useCreateAgendaMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';

const Register: React.FC = () => {
  const router = useRouter();
  useIsAuth();
  const [createAgenda] = useCreateAgendaMutation();
  return (
    <>
      <AppBar />
      <Formik
        initialValues={{
          name: '',
          description: '',
          startTime: '',
          endTime: '',
          venue: '',
        }}
        onSubmit={async (values) => {
          const { errors } = await createAgenda({
            variables: { input: values },
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
                  Create New Event
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
