import { Flex, Heading, Link } from '@chakra-ui/core';
import React from 'react';

const AppBar = () => {
  return (
    <header>
      <Flex justifyContent="space-between" height="100px" bg="#2b2559">
        <Heading
          ml="4"
          color="#f3f3f3"
          display="flex"
          alignItems="center"
          as="span"
        >
          Karnival App
        </Heading>
        <Flex justifyContent="space-evenly" alignItems="center" w="15%">
          <Link color="#f3f3f3" fontSize="1.5rem">
            Register
          </Link>
          <Link color="#f3f3f3" fontSize="1.5rem">
            Login
          </Link>
        </Flex>
      </Flex>
    </header>
  );
};

export default AppBar;
