import { Button, Flex, Heading, Icon, IconButton, Link } from '@chakra-ui/core';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { useApolloClient } from '@apollo/client';

const AppBar = () => {
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: typeof window === 'undefined',
  });
  const apolloClient = useApolloClient();

  return (
    <header>
      <Flex justifyContent="space-between" height="80px" bg="#2b2559">
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
          <Flex justifyContent="space-evenly" alignItems="center" w="25%">
            <Link color="#f3f3f3" fontSize="1.5rem">
              {data.me.username}
            </Link>
            <NextLink href="/new-event">
              <Link
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#f3f3f3"
                fontSize={'1.2rem'}
                py={2}
              >
                <Icon aria-label="Post new event" mx={2} name="add" />
                Post new event
              </Link>
            </NextLink>
            <Button
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
              isLoading={logoutLoading}
              fontSize="1.2rem"
              border="2px solid #000"
              _hover={{
                border: '2px solid #fff',
                backgroundColor: '#000',
                color: '#f3f3f3',
              }}
            >
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default AppBar;
