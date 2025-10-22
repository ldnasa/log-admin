'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';

export function ProjectsEmpty() {
  const router = useRouter();

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-muted p-6 mb-4">
          <FolderOpen className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum projeto cadastrado</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
          Crie seu primeiro projeto para começar a receber logs
        </p>
        <Button onClick={() => router.push('/projects/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </CardContent>
    </Card>
  );
}