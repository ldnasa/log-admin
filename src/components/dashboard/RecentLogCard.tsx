'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { Log } from '@/types/log.types';
import { getLevelConfig, formatRelativeDate } from '@/lib/log-utils';
import { ResolutionBadge } from '@/components/logs/ResolutionBadge';

interface RecentLogCardProps {
  log: Log;
}

export function RecentLogCard({ log }: RecentLogCardProps) {
  const config = getLevelConfig(log.level);
  const Icon = config.icon;

  return (
    <Link href={`/logs/${log.guid}`}>
      <Card className="hover:shadow-md transition-all duration-200 hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={config.badge} className="text-xs">
                  {log.level}
                </Badge>
                {log.isResolved && <ResolutionBadge isResolved size="sm" />}
              </div>
              
              <p className="text-sm font-medium line-clamp-2 mb-2">
                {log.message}
              </p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatRelativeDate(log.resolvedAt)}
                </span>
                {log.resolvedBy && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {log.resolvedBy}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}