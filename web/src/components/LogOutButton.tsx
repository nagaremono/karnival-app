import { useApolloClient } from '@apollo/client';
import { Button, ButtonProps } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useLogoutMutation } from '../generated/graphql';

interface LogOutButtonProps extends ButtonProps {
  onClick?: () => void;
}

export const LogOutButton: FC<LogOutButtonProps> = ({
  onClick,
  variant,
  fontSize,
  colorScheme,
  size,
}) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  return (
    <Button
      display="flex"
      justifyContent="center"
      variant={variant}
      fontSize={fontSize}
      colorScheme={colorScheme}
      size={size}
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
