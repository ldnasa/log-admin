'use client';

import { ReactNode } from 'react';
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
    <div className={cn('space-y-6', className)}>
      <div className="flex items-start justify-between gap-6">
        
        {/* Left: Title + Description */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {title}
          </h1>

          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Right: Actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Badges - Minimalistas */}
      {badges.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {badges.map((badge, index) => {
            const BadgeIcon = badge.icon;
            const variantStyles = {
              default: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
              secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
              outline: 'bg-white border border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300',
              destructive: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400',
            };

            return (
              <div
                key={index}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1',
                  'rounded-md text-xs font-medium',
                  'transition-colors duration-200',
                  variantStyles[badge.variant || 'secondary']
                )}
              >
                {BadgeIcon && <BadgeIcon className="w-3 h-3" strokeWidth={2} />}
                <span>{badge.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}