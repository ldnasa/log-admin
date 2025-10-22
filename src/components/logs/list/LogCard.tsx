// components/logs/list/LogCard.tsx
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Layers } from 'lucide-react';
import { Log } from '@/types/log.types';
import { getLevelConfig } from '@/lib/log-utils';
import { ResolutionBadge } from '@/components/logs/ResolutionBadge';

interface LogCardProps {
  log: Log;
  index: number;
  formatDate: (timestamp: string) => string;
}

export function LogCard({ log, index, formatDate }: LogCardProps) {
  const config = getLevelConfig(log.level);
  const Icon = config.icon;

  return (
    <Link
      href={`/logs/${log.guid}`}
      className="group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card
        className={`
          transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
          ${config.border} border-l-4
          animate-in fade-in slide-in-from-bottom-4
        `}
      >
        <CardContent className="p-5">
          {/* Header do card */}
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${config.bg}`}>
              <Icon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={config.badge} className="text-xs">
                {log.levelText || log.level}
              </Badge>
              {/* Badge de Resolução */}
              <ResolutionBadge isResolved={log.isResolved} size="sm" />
            </div>
          </div>

          {/* GUID */}
          <div className="mb-3">
            <code className="text-xs px-2 py-1 bg-muted rounded font-mono">
              #{log.guid.slice(0, 13)}...
            </code>
          </div>

          {/* Mensagem */}
          <p className="text-sm font-medium mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {log.message}
          </p>

          {/* Meta info */}
          <div className="space-y-2 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Layers className="h-3 w-3" />
              <span className="font-medium">{log.projectName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(log.createdAt)}</span>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="mt-3 pt-3 border-t flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-primary font-medium">
              Ver detalhes →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}