'use client';
import {
  Button,
  CloseButton,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Portal,
  Text,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import NextLink from 'next/link';
import { authClient, useSession } from '@nvl/auth/auth-client';
import { useRouter } from 'next/navigation';

const AppBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const onSignOutClick = async () => {
    await authClient.signOut();
    router.replace('/');
  };

  return (
    <header>
      <Flex
        justifyContent="space-between"
        height="80px"
        bg="#2b2559"
        alignItems="center"
      >
        <Heading ml="4" color="#f3f3f3" display="flex" alignItems="center">
          <NextLink href="/">Nvl</NextLink>
        </Heading>
        <Drawer.Root size={'sm'}>
          <Drawer.Trigger asChild mr={4}>
            <IconButton aria-label="Drawer Menu Button">
              <GiHamburgerMenu />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop h={'100vh'} />
            <Drawer.Positioner h={'100vh'}>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.CloseTrigger asChild position="initial">
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                  <Drawer.Title flex="1">
                    {session && <Text>{session.user?.name}</Text>}
                  </Drawer.Title>
                  {!session && (
                    <Button position="initial" asChild>
                      <NextLink href={'/auth/sign-in'}>Sign In</NextLink>
                    </Button>
                  )}
                  {session && (
                    <Button onClick={onSignOutClick}>Sign Out</Button>
                  )}
                </Drawer.Header>
                <Drawer.Body display="flex" flexDirection="column" gap={4}>
                  <Button
                    asChild
                    colorPalette={'purple'}
                    variant="outline"
                    position="right"
                  >
                    <NextLink href="/events/new">Post an Event</NextLink>
                  </Button>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
        {/* {shouldDrawerShow ? ( */}
        {/*   <> */}
        {/*     <IconButton */}
        {/*       aria-label="Drawer Menu Button" */}
        {/*       icon={<GiHamburgerMenu />} */}
        {/*       onClick={onOpen} */}
        {/*       ref={btnRef} */}
        {/*       mr={4} */}
        {/*       fontSize="1.5rem" */}
        {/*     /> */}
        {/*     <Drawer */}
        {/*       isOpen={isOpen} */}
        {/*       placement="right" */}
        {/*       onClose={onClose} */}
        {/*       finalFocusRef={btnRef} */}
        {/*       size="xs" */}
        {/*     > */}
        {/*       <DrawerOverlay> */}
        {/*         <DrawerContent> */}
        {/*           <DrawerCloseButton /> */}
        {/*           <DrawerHeader>{data?.me?.username}</DrawerHeader> */}
        {/*           <DrawerBody> */}
        {/*             <Flex */}
        {/*               height={16} */}
        {/*               my={4} */}
        {/*               flexDirection="column" */}
        {/*               alignItems="flex-end" */}
        {/*               justifyContent="space-between" */}
        {/*             > */}
        {/*               {!data?.me || loading ? ( */}
        {/*                 <> */}
        {/*                   <Button */}
        {/*                     onClick={() => router.push('/register')} */}
        {/*                     variant="link" */}
        {/*                     size="lg" */}
        {/*                     fontSize="1.3rem" */}
        {/*                     colorScheme="gray" */}
        {/*                   > */}
        {/*                     Register */}
        {/*                   </Button> */}
        {/*                   <Button */}
        {/*                     onClick={() => router.push('/login')} */}
        {/*                     variant="link" */}
        {/*                     size="lg" */}
        {/*                     fontSize="1.3rem" */}
        {/*                     colorScheme="gray" */}
        {/*                   > */}
        {/*                     Login */}
        {/*                   </Button> */}
        {/*                 </> */}
        {/*               ) : ( */}
        {/*                 <> */}
        {/*                   <Button */}
        {/*                     onClick={() => router.push('/new-event')} */}
        {/*                     variant="link" */}
        {/*                     size="lg" */}
        {/*                     fontSize="1.3rem" */}
        {/*                     colorScheme="gray" */}
        {/*                   > */}
        {/*                     Post new event */}
        {/*                   </Button> */}
        {/*                   <LogOutButton */}
        {/*                     onClick={onClose} */}
        {/*                     variant="link" */}
        {/*                     size="lg" */}
        {/*                     fontSize="1.3rem" */}
        {/*                     colorScheme="gray" */}
        {/*                   /> */}
        {/*                 </> */}
        {/*               )} */}
        {/*             </Flex> */}
        {/*           </DrawerBody> */}
        {/*         </DrawerContent> */}
        {/*       </DrawerOverlay> */}
        {/*     </Drawer> */}
        {/*   </> */}
        {/* ) : ( */}
        {/*   <Flex */}
        {/*     width={{ */}
        {/*       base: '40%', */}
        {/*       md: '30%', */}
        {/*       lg: '25%', */}
        {/*       xl: '20%', */}
        {/*       '2xl': '15%', */}
        {/*     }} */}
        {/*     justifyContent="space-evenly" */}
        {/*   > */}
        {/*     {!data?.me || loading ? ( */}
        {/*       <> */}
        {/*         <button onclick={() => router.push('/register')}> */}
        {/*           register */}
        {/*         </button> */}
        {/*         <Button */}
        {/*           variant="outline" */}
        {/*           color="white" */}
        {/*           onClick={() => router.push('/login')} */}
        {/*           _hover={{ backgroundColor: '#1f1f1f' }} */}
        {/*         > */}
        {/*           Login */}
        {/*         </Button> */}
        {/*       </> */}
        {/*     ) : ( */}
        {/*       <> */}
        {/*         <Button */}
        {/*           variant="outline" */}
        {/*           color="white" */}
        {/*           onClick={() => router.push('/new-event')} */}
        {/*           leftIcon={<AiOutlinePlusSquare />} */}
        {/*           _hover={{ backgroundColor: '#1f1f1f' }} */}
        {/*         > */}
        {/*           New Event */}
        {/*         </Button> */}
        {/*         <LogOutButton onClick={onClose} /> */}
        {/*       </> */}
        {/*     )} */}
        {/*   </Flex> */}
        {/* )} */}
      </Flex>
    </header>
  );
};

export default AppBar;
