'use client';

import { ReactNode } from 'react';

interface SidebarMenuSectionProps {
  title?: string;
  children: ReactNode;
}

export function SidebarMenuSection({ title, children }: SidebarMenuSectionProps) {
  return (
    <div className="space-y-1">
      {title && (
        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}