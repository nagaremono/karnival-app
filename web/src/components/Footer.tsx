import { Flex, Text, Link } from '@chakra-ui/core';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px={4}
      mt={12}
      backgroundColor="#2b2559"
      height="100px"
      as="footer"
    >
      <Text mx={4} fontSize="1.3rem" color="#f3f3f3">
        <Link target="_blank" href="https://github.com/nagaremono/karnival-app">
          This page's repo
        </Link>
      </Text>
      <Text mx={4} fontSize="1.3rem" color="#f3f3f3">
        Any feedback? Contact me at{' '}
        <Link target="_blank" href="https://twitter.com/GuruhEdiP">
          Twitter
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
