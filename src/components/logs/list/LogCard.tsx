'use client';

import Link from 'next/link';
import { Log } from '@/types/log.types';
import { getLevelConfig, getLevelName } from '@/lib/log-utils';
import { Clock, User, Globe, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogCardProps {
  log: Log;
  index: number;
  formatDate: (date: string) => string;
}

const levelColors = {
  Debug: 'bg-slate-500',
  Info: 'bg-blue-500',
  Warning: 'bg-amber-500',
  Error: 'bg-rose-500',
  Fatal: 'bg-red-600',
};

export function LogCard({ log, index, formatDate }: LogCardProps) {
  const config = getLevelConfig(log.level);
  const Icon = config.icon;
  const levelName = getLevelName(log.level);
  const bgColor = levelColors[levelName as keyof typeof levelColors] || levelColors.Info;

  return (
    <Link href={`/logs/${log.guid}`} className="block group">
      <div className={cn(
        'bg-white dark:bg-slate-900',
        'rounded-lg border border-slate-200 dark:border-slate-800',
        'hover:border-slate-300 dark:hover:border-slate-700',
        'hover:shadow-sm transition-all duration-200 p-4'
      )}>
        
        {/* Icon + Status */}
        <div className="flex items-center justify-between mb-2">
          <div className={cn('w-7 h-7 rounded flex items-center justify-center', bgColor)}>
            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </div>
          {log.isResolved && (
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          )}
        </div>

        {/* Message */}
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2 mb-3">
          {log.message}
        </p>

        {/* Info Grid */}
        <div className="space-y-1 text-xs">
          {/* Projeto */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Globe className="w-3 h-3" />
            <span className="truncate">{log.projectName}</span>
          </div>

          {/* URL */}
          {log.fileName && (
            <div className="text-slate-500 dark:text-slate-500 truncate pl-4.5">
              {log.fileName}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              {formatDate(log.createdAt)}
            </span>

            {log.isResolved && log.resolvedBy && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 truncate">
                <User className="w-3 h-3" />
                <span className="truncate">{log.resolvedBy}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}