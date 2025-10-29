'use client';

import { Globe, MapPin, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OriginCardProps {
  dominio: string;
  ipOrigem: string;
  userAgent: string;
}

export function OriginCard({ dominio, ipOrigem, userAgent }: OriginCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800',
      'rounded-lg p-4'
    )}>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Globe className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Origem
        </h3>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        
        {/* Domínio */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Domínio
          </label>
          <p className={cn(
            'text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300'
          )}>
            {dominio}
          </p>
        </div>

        {/* IP */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            IP de Origem
          </label>
          <code className={cn(
            'block text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'font-mono'
          )}>
            {ipOrigem}
          </code>
        </div>

        {/* User Agent */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            User Agent
          </label>
          <p className={cn(
            'text-xs',
            'bg-slate-50 dark:bg-slate-950',
            'px-2 py-1.5 rounded',
            'text-slate-700 dark:text-slate-300',
            'break-all leading-relaxed'
          )}>
            {userAgent}
          </p>
        </div>
      </div>
    </div>
  );
}