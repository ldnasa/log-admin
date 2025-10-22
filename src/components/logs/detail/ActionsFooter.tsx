'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ActionsFooter() {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/logs')}
            className="w-full md:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para lista
          </Button>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-initial"
              onClick={() => alert('Exportar funcionalidade em desenvolvimento')}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button
              variant="default"
              className="flex-1 md:flex-initial"
              onClick={() => alert('Relatório em desenvolvimento')}
            >
              Gerar Relatório
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}