'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ✅ Adicionar interface das props
interface ActionsFooterProps {
  onDelete: () => Promise<void>;
  onExport: () => void;
  onShare: () => Promise<void>;
}

// ✅ Adicionar props no componente
export function ActionsFooter({ onDelete, onExport, onShare }: ActionsFooterProps) {
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
            {/* ✅ Usar a prop onExport */}
            <Button
              variant="outline"
              className="flex-1 md:flex-initial"
              onClick={onExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>

            {/* ✅ Usar a prop onShare */}
            <Button
              variant="default"
              className="flex-1 md:flex-initial"
              onClick={onShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>

            {/* ✅ Usar a prop onDelete */}
            <Button
              variant="destructive"
              className="flex-1 md:flex-initial"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Deletar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}