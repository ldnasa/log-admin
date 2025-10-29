'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LogNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className={cn(
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-800',
          'rounded-lg p-8 text-center'
        )}>
          
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-slate-400" />
          </div>

          {/* Text */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Log não encontrado
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            O log solicitado não existe ou foi removido
          </p>

          {/* Action */}
          <Button onClick={() => router.push('/logs')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para logs
          </Button>
        </div>
      </div>
    </div>
  );
}