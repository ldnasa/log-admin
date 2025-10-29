'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ChevronRight } from 'lucide-react';
import { Log, LogLevel } from '@/types/log.types';
import { getLevelConfig, formatRelativeDate } from '@/lib/log-utils';
import { ResolutionBadge } from '@/components/logs/ResolutionBadge';
import { cn } from '@/lib/utils';

interface RecentLogCardProps {
  log: Log;
  showProject?: boolean;
  className?: string;
}

const levelStyles = {
  Debug: {
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600',
    iconColor: 'text-white',
    borderColor: 'border-l-slate-500',
    hoverGlow: 'hover:shadow-slate-500/10',
    badgeBg: 'bg-slate-50 dark:bg-slate-950/30',
    badgeText: 'text-slate-700 dark:text-slate-400',
  },
  Info: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    borderColor: 'border-l-blue-500',
    hoverGlow: 'hover:shadow-blue-500/10',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/30',
    badgeText: 'text-blue-700 dark:text-blue-400',
  },
  Warning: {
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    iconColor: 'text-white',
    borderColor: 'border-l-amber-500',
    hoverGlow: 'hover:shadow-amber-500/10',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/30',
    badgeText: 'text-amber-700 dark:text-amber-400',
  },
  Error: {
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    iconColor: 'text-white',
    borderColor: 'border-l-rose-500',
    hoverGlow: 'hover:shadow-rose-500/10',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/30',
    badgeText: 'text-rose-700 dark:text-rose-400',
  },
  Fatal: {
    iconBg: 'bg-gradient-to-br from-red-600 to-red-700',
    iconColor: 'text-white',
    borderColor: 'border-l-red-600',
    hoverGlow: 'hover:shadow-red-600/20',
    badgeBg: 'bg-red-50 dark:bg-red-950/30',
    badgeText: 'text-red-700 dark:text-red-400',
  },
};

// ✅ Função para converter o número do enum para o nome
function getLevelName(level: LogLevel): keyof typeof levelStyles {
  const names: Record<LogLevel, keyof typeof levelStyles> = {
    [LogLevel.DEBUG]: 'Debug',
    [LogLevel.INFO]: 'Info',
    [LogLevel.WARN]: 'Warning',
    [LogLevel.ERROR]: 'Error',
    [LogLevel.FATAL]: 'Fatal',
  };
  return names[level] || 'Info';
}

export function RecentLogCard({ log, showProject = false, className }: RecentLogCardProps) {
  const config = getLevelConfig(log.level);
  const Icon = config.icon;
  const levelName = getLevelName(log.level); // ✅ Converte número para nome
  const styles = levelStyles[levelName];

  return (
    <Link href={`/logs/${log.guid}`} className="block group">
      <div
        className={cn(
          // Base
          'relative overflow-hidden',
          'bg-white dark:bg-slate-900',
          'rounded-xl border border-slate-200 dark:border-slate-800',
          'border-l-4',
          styles.borderColor,
          
          // Shadow & Hover
          'shadow-sm hover:shadow-lg',
          styles.hoverGlow,
          'transition-all duration-300 ease-out',
          'hover:-translate-y-0.5',
          
          className
        )}
      >
        <div className="p-4">
          <div className="flex items-start gap-4">
            
            {/* Ícone com Gradiente */}
            <div className={cn(
              'flex items-center justify-center',
              'w-11 h-11 rounded-xl',
              'flex-shrink-0',
              'shadow-md',
              'transition-transform duration-300',
              'group-hover:scale-110 group-hover:rotate-3',
              styles.iconBg
            )}>
              <Icon className={cn('w-5 h-5', styles.iconColor)} strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              
              {/* Header: Badges */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={cn(
                  'inline-flex items-center px-2.5 py-1',
                  'rounded-lg text-xs font-semibold',
                  'border',
                  styles.badgeBg,
                  styles.badgeText,
                  'border-current/20'
                )}>
                  {levelName} {/* ✅ Exibe o nome ao invés do número */}
                </span>
                
                {log.isResolved && (
                  <ResolutionBadge isResolved size="sm" />
                )}

                {showProject && log.projectId && (
                  <Badge variant="outline" className="text-xs">
                    Projeto #{log.projectId}
                  </Badge>
                )}
              </div>

              {/* Message */}
              <p className={cn(
                'text-sm font-medium leading-relaxed mb-3',
                'text-slate-900 dark:text-slate-100',
                'line-clamp-2',
                'group-hover:text-slate-700 dark:group-hover:text-slate-300',
                'transition-colors'
              )}>
                {log.message}
              </p>

              {/* Footer: Meta Info */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {formatRelativeDate(log.resolvedAt || log.timeStamp)}
                  </span>
                  
                  {log.resolvedBy && (
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {log.resolvedBy}
                    </span>
                  )}
                </div>

                {/* Arrow Indicator */}
                <ChevronRight className={cn(
                  'h-4 w-4 text-slate-400',
                  'transition-all duration-300',
                  'group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                )} />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Gradient Bottom Border */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5',
          'bg-gradient-to-r opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
          styles.iconBg
        )} />
      </div>
    </Link>
  );
}