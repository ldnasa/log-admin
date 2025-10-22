// components/logs/detail/DescriptionCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Copy, Check } from 'lucide-react';

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
    <Card className="animate-in fade-in slide-in-from-bottom-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Descrição Completa
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(descricaoCompleta, 'descricao')}
          >
            {copiedField === 'descricao' ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="bg-muted p-6 rounded-lg whitespace-pre-wrap text-sm leading-relaxed">
            {descricaoCompleta}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}