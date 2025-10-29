'use client';

import { User, FileCode, Globe, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickInfoGridProps {
  userName: string;
  arquivo: string;
  dominio: string;
  timestamp: string;
  formatDateTime: (timestamp: string) => string;
}

export function QuickInfoGrid({
  userName,
  arquivo,
  dominio,
  timestamp,
  formatDateTime,
}: QuickInfoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 gap-4',
      'bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800',
      'rounded-lg p-4'
    )}>
      
      {/* Usuário */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            Usuário
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {userName}
          </p>
        </div>
      </div>

      {/* Arquivo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center shrink-0">
          <FileCode className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            Arquivo
          </p>
          <p className="text-xs font-mono font-medium text-slate-900 dark:text-white truncate">
            {arquivo}
          </p>
        </div>
      </div>

      {/* Domínio */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
          <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            Domínio
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {dominio}
          </p>
        </div>
      </div>

      {/* Data e Hora */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
          <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            Data e Hora
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {formatDateTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}