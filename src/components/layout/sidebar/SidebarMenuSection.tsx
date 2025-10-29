'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarMenuSectionProps {
  title?: string;
  children: ReactNode;
}

export function SidebarMenuSection({ title, children }: SidebarMenuSectionProps) {
  return (
    <div className="space-y-1">
      {title && (
        <div className="relative px-4 mb-3">
          <p className={cn(
            'text-[11px] font-bold uppercase tracking-widest',
            'text-slate-500 dark:text-slate-500',
            'flex items-center gap-2'
          )}>
            {title}
            {/* Decorative line */}
            <span className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
          </p>
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}