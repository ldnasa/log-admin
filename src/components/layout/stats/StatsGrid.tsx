'use client';

import { LucideIcon } from 'lucide-react';
import { StatCard } from './StatCard';
import { cn } from '@/lib/utils';

export interface Stat {
  label: string;
  value: number | string;
  icon: LucideIcon;
  variant?: 'default' | 'error' | 'warning' | 'info' | 'success';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridColsClass = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
  }[columns];

  return (
    <div 
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6',
        gridColsClass,
        className
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={`${stat.label}-${index}`}
          style={{ 
            animationDelay: `${index * 80}ms`,
            animationFillMode: 'backwards'
          }}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}