// components/logs/detail/QuickInfoGrid.tsx
'use client';

import { User, FileCode, Globe, Calendar } from 'lucide-react';

interface QuickInfoGridProps {
  userName: string;
  arquivo: string;
  dominio: string;
  timestamp: string;
  formatDateTime: (timestamp: string) => string;
}

export function QuickInfoGrid({
  userName,
  arquivo,
  dominio,
  timestamp,
  formatDateTime,
}: QuickInfoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background/50 rounded-lg border mt-6">
      <div className="flex items-center gap-3">
        <User className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">Usuário</p>
          <p className="font-medium">{userName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FileCode className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">Arquivo</p>
          <p className="font-medium font-mono text-sm">{arquivo}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">Domínio</p>
          <p className="font-medium">{dominio}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">Data e Hora</p>
          <p className="font-medium">{formatDateTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
}