'use client';

import { Log } from '@/types/log.types';
import { getLevelConfig, getLevelName } from '@/lib/log-utils';
import { CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogHeroSectionProps {
  log: Log;
  formatDateTime: (timestamp: string) => string;
}

const levelColors = {
  Debug: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Info: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  Warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  Error: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400',
  Fatal: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
};

export function LogHeroSection({ log, formatDateTime }: LogHeroSectionProps) {
  const config = getLevelConfig(log.level);
  const levelName = getLevelName(log.level);
  const levelColor = levelColors[levelName as keyof typeof levelColors] || levelColors.Info;

  return (
    <div className="space-y-4">
      
      {/* Badges Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Level Badge */}
        <span className={cn(
          'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold',
          levelColor
        )}>
          {levelName}
        </span>

        {/* Project Badge */}
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {log.projectName}
        </span>

        {/* Resolution Badge */}
        {log.isResolved ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            Resolvido
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <Clock className="w-3 h-3" />
            Pendente
          </span>
        )}

        {/* Timestamp */}
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatDateTime(log.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
        {log.message}
      </h1>
    </div>
  );
}