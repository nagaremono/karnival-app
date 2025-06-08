'use client';

import { Container, Spinner, Text } from '@chakra-ui/react';
import AppBar from '@nvl/components/app-bar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TWO_SECONDS = 2000;

export default function NoAccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    }, TWO_SECONDS);
  }, [router]);

  return (
    <main>
      <AppBar />
      <Container centerContent={true} p={8}>
        <Text textStyle={'2xl'} my={4}>
          You don&apos;t have access to that page, redirecting...
        </Text>
        <Spinner size="lg" my={4} />
      </Container>
    </main>
  );
}
