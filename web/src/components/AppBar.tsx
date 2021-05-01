import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { LogOutButton } from './LogOutButton';

const AppBar = () => {
  const { data, loading } = useMeQuery({});

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
          <NextLink href="/">Karnival</NextLink>
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
                      <AddIcon aria-label="Post new event" mx={2} />
                      Post new event
                    </Link>
                  </MenuItem>
                </NextLink>
                <LogOutButton />
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </header>
  );
};

export default AppBar;
