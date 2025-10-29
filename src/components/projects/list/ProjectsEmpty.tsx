'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectsEmpty() {
  const router = useRouter();

  return (
    <div className={cn(
      'bg-white dark:bg-slate-900',
      'border border-dashed border-slate-300 dark:border-slate-700',
      'rounded-lg p-12 text-center'
    )}>
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <FolderOpen className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Nenhum projeto cadastrado
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
        Crie seu primeiro projeto para começar a receber logs
      </p>
      <Button onClick={() => router.push('/projects/new')} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Novo Projeto
      </Button>
    </div>
  );
}