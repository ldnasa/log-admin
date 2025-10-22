'use client';

import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    icon?: LucideIcon;
  }>;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badges = [],
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Header Principal */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Badges no topo - pequenos e discretos */}
          {badges.length > 0 && (
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {badges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                return (
                  <Badge
                    key={index}
                    variant={badge.variant || 'secondary'}
                    className="text-xs font-normal"
                  >
                    {BadgeIcon && <BadgeIcon className="h-3 w-3 mr-1" />}
                    {badge.label}
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {title}
          </h1>

          {/* Descrição */}
          {description && (
            <p className="text-base text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Divider sutil */}
      <div className="h-px bg-border" />
    </div>
  );
}