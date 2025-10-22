// components/logs/detail/IdentificationCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCode, Copy, Check } from 'lucide-react';

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
    <Card className="animate-in fade-in slide-in-from-left-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileCode className="h-5 w-5 text-primary" />
          Identificação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground font-medium">GUID</label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6"
              onClick={() => onCopy(guid, 'guid')}
            >
              {copiedField === 'guid' ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <code className="block text-sm bg-muted px-3 py-2 rounded font-mono">
            {guid}
          </code>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-medium">
            Request ID
          </label>
          <code className="block text-sm bg-muted px-3 py-2 rounded font-mono mt-1">
            {requestId}
          </code>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-medium">Método</label>
          <p className="text-sm font-mono bg-muted px-3 py-2 rounded mt-1">
            {metodo}
          </p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-medium">Linha</label>
          <p className="text-sm font-mono bg-muted px-3 py-2 rounded mt-1">{linha}</p>
        </div>
      </CardContent>
    </Card>
  );
}