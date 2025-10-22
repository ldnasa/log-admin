// components/logs/detail/OriginCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface OriginCardProps {
  dominio: string;
  ipOrigem: string;
  userAgent: string;
}

export function OriginCard({ dominio, ipOrigem, userAgent }: OriginCardProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-right-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Origem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground font-medium">Domínio</label>
          <p className="text-sm bg-muted px-3 py-2 rounded mt-1">{dominio}</p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-medium">
            IP de Origem
          </label>
          <code className="block text-sm font-mono bg-muted px-3 py-2 rounded mt-1">
            {ipOrigem}
          </code>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-medium">
            User Agent
          </label>
          <p className="text-xs bg-muted px-3 py-2 rounded mt-1 break-all">
            {userAgent}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}