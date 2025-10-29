'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function SidebarLogo() {
  return (
    <Link
      href="/"
      className="group relative flex flex-col items-center justify-center gap-3 px-4 py-6 transition-all duration-300"
    >
      {/* Texto "Sistema de Logs" */}
      <span className={cn(
        'text-xs font-bold uppercase tracking-[0.2em]',
        'text-slate-600 dark:text-slate-400',
        'transition-colors duration-300'
      )}>
        Sistema de Logs
      </span>

      {/* Logo Container */}
      <div className={cn(
        'flex items-center justify-center overflow-hidden',
        'transition-all duration-300',
      )}>

        <Image
          src="/logo-desktop.svg"
          alt="Londrina S.A."
          width={160}
          height={80}
          className="relative z-10 object-contain dark:brightness-0 dark:invert w-full h-full"
          priority
        />
      </div>
    </Link>
  );
}