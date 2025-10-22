// components/logs/detail/LogNotFound.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Log não encontrado</h2>
            <p className="text-muted-foreground mb-6">
              O log solicitado não existe ou foi removido
            </p>
            <Button onClick={() => router.push('/logs')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}