import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StoreProvider from '@/hoc/app/StoreProvider';
import AppProvider from '@/hoc/app/AppProvider';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/Header';
import AuthLayout from '@/layouts/AuthLayout';
import '@styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function CoreAuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppProvider>
            <ToastContainer />
            <AuthLayout>{children}</AuthLayout>
          </AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
