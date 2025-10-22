'use client';

import { LucideIcon } from 'lucide-react';
import { StatCard } from './StatCard';

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
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-in fade-in slide-in-from-bottom-2"
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}