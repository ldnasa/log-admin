// components/logs/detail/LogHeroSection.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Log } from '@/types/log.types';
import { getLevelConfig } from '@/lib/log-utils';
import { ResolutionBadge } from '@/components/logs/ResolutionBadge';

interface LogHeroSectionProps {
  log: Log;
  formatDateTime: (timestamp: string) => string;
}

export function LogHeroSection({ log, formatDateTime }: LogHeroSectionProps) {
  const config = getLevelConfig(log.level);

  return (
    <div className="space-y-3">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={config.badge} className="text-xs">
          {log.levelText || log.level}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {log.projectName}
        </Badge>
        {log.isResolved !== undefined && (
          <ResolutionBadge isResolved={log.isResolved} size="sm" />
        )}
        <span className="text-xs text-muted-foreground">
          {formatDateTime(log.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold leading-tight">
        {log.message}
      </h1>
    </div>
  );
}