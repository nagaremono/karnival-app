import {
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { useApolloClient } from '@apollo/client';

const AppBar = () => {
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useMeQuery({});
  const apolloClient = useApolloClient();

  return (
    <header>
      <Flex
        justifyContent="space-between"
        height="80px"
        bg="#2b2559"
        alignItems="center"
      >
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
          <Menu>
            <MenuButton mr="4" fontSize="1.2rem" as={Button}>
              Login
            </MenuButton>
            <MenuList>
              <NextLink href="/register">
                <MenuItem>
                  <Link color="#000">Register</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/login">
                <MenuItem>
                  <Link color="#000">Login</Link>
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Menu>
              <MenuButton as={Button} fontSize="1.2rem" mr="4">
                {data?.me.username}
              </MenuButton>
              <MenuList>
                <NextLink href="/new-event">
                  <MenuItem>
                    <Link
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="#000"
                      fontSize={'1.2rem'}
                      py={2}
                    >
                      <Icon aria-label="Post new event" mx={2} name="add" />
                      Post new event
                    </Link>
                  </MenuItem>
                </NextLink>
                <MenuItem
                  display="flex"
                  justifyContent="center"
                  fontSize="1.2rem"
                  onClick={async () => {
                    await logout();
                    await apolloClient.cache.reset();
                    await apolloClient.resetStore();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </header>
  );
};

export default AppBar;
