'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DescriptionCardProps {
  descricaoCompleta: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export function DescriptionCard({
  descricaoCompleta,
  copiedField,
  onCopy,
}: DescriptionCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-900',
      'border border-slate-200 dark:border-slate-800',
      'rounded-lg p-4'
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
            <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Descrição
          </h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(descricaoCompleta, 'descricao')}
          className="h-7 text-xs gap-1"
        >
          {copiedField === 'descricao' ? (
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

      {/* Content */}
      <div className={cn(
        'bg-slate-50 dark:bg-slate-950',
        'rounded-lg p-4',
        'text-sm text-slate-700 dark:text-slate-300',
        'whitespace-pre-wrap leading-relaxed',
        'font-mono',
        'overflow-scroll'
      )}>
        {descricaoCompleta}
      </div>
    </div>
  );
}