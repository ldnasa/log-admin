'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Home, ChevronRight } from 'lucide-react';

export function ProfileHeader() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-orange-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Perfil</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}