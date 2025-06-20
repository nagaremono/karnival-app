import './globals.css';
import { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Karnival',
  description:
    'Karnival application, where people can post events happening around them and invite people',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
