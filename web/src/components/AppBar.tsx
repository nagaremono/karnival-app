import { Flex, Heading, Link } from '@chakra-ui/core';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

const AppBar = () => {
  const { data, loading } = useMeQuery();

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
        {!data?.me || loading ? (
          <Flex justifyContent="space-evenly" alignItems="center" w="15%">
            <Link color="#f3f3f3" fontSize="1.4rem">
              Register
            </Link>
            <Link color="#f3f3f3" fontSize="1.4rem">
              Login
            </Link>
          </Flex>
        ) : (
          <Flex justifyContent="space-evenly" alignItems="center" w="15%">
            <Link color="#f3f3f3" fontSize="1.5rem">
              {data.me.username}
            </Link>
            <Link color="#f3f3f3" fontSize="1.3rem">
              Logout
            </Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default AppBar;
