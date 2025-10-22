'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  variant?: 'default' | 'error' | 'warning' | 'info' | 'success';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const variantStyles = {
  default: {
    border: 'border-primary/20',
    gradient: 'from-primary/5 to-primary/0',
    iconColor: 'text-primary',
    valueColor: 'text-foreground',
    iconBg: 'bg-primary/10',
  },
  error: {
    border: 'border-error/20',
    gradient: 'from-error/5 to-error/0',
    iconColor: 'text-error',
    valueColor: 'text-error',
    iconBg: 'bg-error/10',
  },
  warning: {
    border: 'border-warning/20',
    gradient: 'from-warning/5 to-warning/0',
    iconColor: 'text-warning',
    valueColor: 'text-warning',
    iconBg: 'bg-warning/10',
  },
  info: {
    border: 'border-info/20',
    gradient: 'from-info/5 to-info/0',
    iconColor: 'text-info',
    valueColor: 'text-info',
    iconBg: 'bg-info/10',
  },
  success: {
    border: 'border-success/20',
    gradient: 'from-success/5 to-success/0',
    iconColor: 'text-success',
    valueColor: 'text-success',
    iconBg: 'bg-success/10',
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
  trend,
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-l-4 transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02]',
        'bg-gradient-to-br',
        styles.border,
        styles.gradient,
        className
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className={cn('text-3xl font-bold', styles.valueColor)}>
                {value}
              </p>
            </div>
          </div>

          {/* Icon */}
          <div className={cn('p-2.5 rounded-xl', styles.iconBg)}>
            <Icon className={cn('h-5 w-5', styles.iconColor)} />
          </div>
        </div>
      
      </CardContent>
    </Card>
  );
}