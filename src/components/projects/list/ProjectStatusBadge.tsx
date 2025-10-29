'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectStatusBadgeProps {
  isActive: boolean;
}

export function ProjectStatusBadge({ isActive }: ProjectStatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
      isActive
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
    )}>
      {isActive ? (
        <>
          <CheckCircle className="h-3 w-3" />
          Ativo
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3" />
          Inativo
        </>
      )}
    </span>
  );
}