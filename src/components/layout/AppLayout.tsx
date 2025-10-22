'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-72">
        <TopBar />
        {children}
      </main>
    </div>
  );
}