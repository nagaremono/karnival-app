import { Flex, Heading, Link } from '@chakra-ui/core';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';

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
          <NextLink href="/">Karnival App</NextLink>
        </Heading>
        {!data?.me || loading ? (
          <Flex justifyContent="space-evenly" alignItems="center" w="15%">
            <NextLink href="/register">
              <Link color="#f3f3f3" fontSize="1.4rem">
                Register
              </Link>
            </NextLink>
            <NextLink href="login">
              <Link color="#f3f3f3" fontSize="1.4rem">
                Login
              </Link>
            </NextLink>
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
