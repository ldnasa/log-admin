'use client';

import Link from 'next/link';
import Image from 'next/image';

export function SidebarLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 px-4 py-6">
      <div className="relative w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
        <Image
          src="https://www.londrinasa.com.br/assets/img/header/logo-desktop.svg"
          alt="Londrina S.A."
          width={32}
          height={32}
          className="object-contain dark:brightness-0 dark:invert"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-base leading-tight">Sistema de Logs</span>
        <span className="text-xs text-muted-foreground">Londrina S.A.</span>
      </div>
    </Link>
  );
}