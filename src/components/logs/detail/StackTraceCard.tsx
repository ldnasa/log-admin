'use client';

import { Button } from '@/components/ui/button';
import { Bug, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StackTraceCardProps {
  stackTrace: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export function StackTraceCard({
  stackTrace,
  copiedField,
  onCopy,
}: StackTraceCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800',
      'rounded-lg p-4'
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center">
            <Bug className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Stack Trace
          </h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(stackTrace, 'stack')}
          className="h-7 text-xs gap-1"
        >
          {copiedField === 'stack' ? (
            <>
              <Check className="h-3 w-3" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copiar
            </>
          )}
        </Button>
      </div>

      {/* Stack Trace Content */}
      <pre className={cn(
        'bg-slate-950 dark:bg-slate-950',
        'text-emerald-400',
        'p-4 rounded-lg',
        'text-xs leading-relaxed',
        'overflow-x-auto',
        'font-mono'
      )}>
        <code>{stackTrace}</code>
      </pre>
    </div>
  );
}