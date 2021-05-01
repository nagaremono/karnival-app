import { useApolloClient } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useLogoutMutation } from '../generated/graphql';

interface LogOutButtonProps {
  onClick?: () => void;
  variant?:
    | 'link'
    | 'outline'
    | (string & {})
    | 'ghost'
    | 'solid'
    | 'unstyled'
    | undefined;
}

export const LogOutButton: FC<LogOutButtonProps> = ({ onClick, variant }) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  return (
    <Button
      display="flex"
      justifyContent="center"
      variant={variant}
      onClick={async () => {
        await logout();
        await apolloClient.cache.reset();
        await apolloClient.resetStore();
        typeof router.query.next === 'string'
          ? router.push(router.query.next)
          : router.push('/');
        onClick && onClick();
      }}
    >
      Logout
    </Button>
  );
};
