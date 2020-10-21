import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/core';

type EventDetailItemProps = {
  title?: string;
  text?: string;
};

const EventDetailItem: React.FC<EventDetailItemProps> = ({ title, text }) => {
  return (
    <Box mb={4}>
      <Heading fontSize="1.3rem" as="h4">
        {title}
      </Heading>
      <Text fontSize="1.1rem">{text}</Text>
    </Box>
  );
};

export default EventDetailItem;
