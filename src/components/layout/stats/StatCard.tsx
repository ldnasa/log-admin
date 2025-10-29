'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  variant?: 'default' | 'error' | 'warning' | 'info' | 'success';
  className?: string;
}

const variantStyles = {
  default: {
    iconBg: 'from-blue-500 to-blue-600',
    iconColor: 'text-white',
    valueColor: 'text-slate-900 dark:text-white',
    glow: 'group-hover:shadow-blue-500/20',
  },
  error: {
    iconBg: 'from-rose-500 to-rose-600',
    iconColor: 'text-white',
    valueColor: 'text-rose-600 dark:text-rose-400',
    glow: 'group-hover:shadow-rose-500/20',
  },
  warning: {
    iconBg: 'from-amber-500 to-amber-600',
    iconColor: 'text-white',
    valueColor: 'text-amber-600 dark:text-amber-400',
    glow: 'group-hover:shadow-amber-500/20',
  },
  info: {
    iconBg: 'from-sky-500 to-sky-600',
    iconColor: 'text-white',
    valueColor: 'text-sky-600 dark:text-sky-400',
    glow: 'group-hover:shadow-sky-500/20',
  },
  success: {
    iconBg: 'from-emerald-500 to-emerald-600',
    iconColor: 'text-white',
    valueColor: 'text-emerald-600 dark:text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'bg-white dark:bg-slate-900',
        'rounded-2xl border border-slate-200 dark:border-slate-800',
        'shadow-sm hover:shadow-xl',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1',
        styles.glow,
        className
      )}
    >
      {/* Card Content */}
      <div className="relative p-6">
        
        {/* Header com Label e Ícone */}
        <div className="flex items-start justify-between mb-4">
          
          {/* Label */}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {label}
            </p>
          </div>

          {/* Ícone com Gradiente */}
          <div className={cn(
            'flex items-center justify-center',
            'w-12 h-12 rounded-xl',
            'bg-gradient-to-br',
            'shadow-lg transition-transform duration-300',
            'group-hover:scale-110 group-hover:rotate-3',
            styles.iconBg
          )}>
            <Icon className={cn('w-6 h-6', styles.iconColor)} strokeWidth={2.5} />
          </div>
        </div>

        {/* Value */}
        <div className="space-y-2">
          <p className={cn(
            'text-4xl font-bold tracking-tight',
            'leading-none',
            styles.valueColor
          )}>
            {value}
          </p>
        </div>

      </div>

      {/* Decorative Bottom Border */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-1',
        'bg-gradient-to-r opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300',
        styles.iconBg
      )} />
    </div>
  );
}