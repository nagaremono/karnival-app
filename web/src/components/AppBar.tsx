import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useRef } from 'react';
import { useMeQuery } from '../generated/graphql';
import { LogOutButton } from './LogOutButton';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { useRouter } from 'next/router';

const AppBar = () => {
  const { data, loading } = useMeQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const router = useRouter();
  const shouldDrawerShow = useBreakpointValue({ base: true, sm: false });

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
        {shouldDrawerShow ? (
          <>
            <IconButton
              aria-label="Drawer Menu Button"
              icon={<GiHamburgerMenu />}
              onClick={onOpen}
              ref={btnRef}
              mr={4}
              fontSize="1.5rem"
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size="xs"
            >
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>{data?.me?.username}</DrawerHeader>
                  <DrawerBody>
                    {!data?.me || loading ? (
                      <>
                        <Button
                          onClick={() => router.push('/register')}
                          variant="link"
                        >
                          Register
                        </Button>
                        <Button
                          onClick={() => router.push('/login')}
                          variant="link"
                        >
                          Login
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => router.push('/new-event')}
                          variant="link"
                        >
                          Post new event
                        </Button>
                        <LogOutButton onClick={onClose} variant="link" />
                      </>
                    )}
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        ) : (
          <Flex
            width={{
              base: '40%',
              md: '30%',
              lg: '25%',
              xl: '20%',
              '2xl': '15%',
            }}
            justifyContent="space-evenly"
          >
            {!data?.me || loading ? (
              <>
                <Button onClick={() => router.push('/register')}>
                  Register
                </Button>
                <Button
                  variant="outline"
                  color="white"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  color="white"
                  onClick={() => router.push('/new-event')}
                  leftIcon={<AiOutlinePlusSquare />}
                >
                  New Event
                </Button>
                <LogOutButton onClick={onClose} />
              </>
            )}
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default AppBar;
