'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentificationCardProps {
  guid: string;
  requestId: string;
  metodo: string;
  linha: number;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export function IdentificationCard({
  guid,
  requestId,
  metodo,
  linha,
  copiedField,
  onCopy,
}: IdentificationCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800',
      'rounded-lg p-4'
    )}>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Hash className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Identificação
        </h3>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        
        {/* GUID */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
              GUID
            </label>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => onCopy(guid, 'guid')}
            >
              {copiedField === 'guid' ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <code className={cn(
            'block text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'font-mono truncate'
          )}>
            {guid}
          </code>
        </div>

        {/* Request ID */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
            Request ID
          </label>
          <code className={cn(
            'block text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'font-mono'
          )}>
            {requestId}
          </code>
        </div>

        {/* Método */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
            Método
          </label>
          <p className={cn(
            'text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'font-mono'
          )}>
            {metodo}
          </p>
        </div>

        {/* Linha */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
            Linha
          </label>
          <p className={cn(
            'text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'font-mono'
          )}>
            {linha}
          </p>
        </div>
      </div>
    </div>
  );
}