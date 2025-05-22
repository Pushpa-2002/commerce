
'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import Footer from '@/components/footer';

// Dynamically import the Header (client-only)
const Header = dynamic(() => import('@/components/header'), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}