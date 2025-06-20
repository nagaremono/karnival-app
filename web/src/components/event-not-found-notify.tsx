'use client';
import { Container, Text } from '@chakra-ui/react';

export function EventNotFoundCard() {
  return (
    <Container centerContent={true} p={8}>
      <Text textStyle={'2xl'} color="#000000">
        Event is not found
      </Text>
    </Container>
  );
}

export default EventNotFoundCard;
