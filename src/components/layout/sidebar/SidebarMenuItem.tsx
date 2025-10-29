'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarMenuItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  onClick?: () => void;
}

export function SidebarMenuItem({
  href,
  icon: Icon,
  label,
  badge,
  onClick,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(href + '/');

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 px-4 py-3 rounded-xl',
        'transition-all duration-200 ease-out',
        'hover:translate-x-1',
        isActive
          ? [
              // Active state - Gradiente sutil
              'bg-gradient-to-r from-blue-50 to-blue-50/50',
              'dark:from-blue-950/50 dark:to-blue-900/30',
              'text-blue-700 dark:text-blue-400',
              'font-semibold',
              'shadow-sm shadow-blue-500/5',
            ]
          : [
              // Inactive state
              'text-slate-600 dark:text-slate-400',
              'hover:bg-slate-100/80 dark:hover:bg-slate-800/50',
              'hover:text-slate-900 dark:hover:text-slate-100',
            ]
      )}
    >
      {/* Active Indicator - Gradiente moderno */}
      {isActive && (
        <div className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2',
          'w-1 h-8 rounded-r-full',
          'bg-gradient-to-b from-blue-500 to-blue-600',
          'shadow-md shadow-blue-500/50',
          'animate-in slide-in-from-left-2 duration-200'
        )} />
      )}

      {/* Icon com gradiente container */}
      <div className={cn(
        'relative flex items-center justify-center',
        'w-9 h-9 rounded-lg',
        'transition-all duration-200',
        isActive
          ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20'
          : 'group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50'
      )}>
        <Icon
          className={cn(
            'h-5 w-5 transition-all duration-200',
            'group-hover:scale-110',
            isActive && 'drop-shadow-sm'
          )}
          strokeWidth={isActive ? 2.5 : 2}
        />
      </div>
      
      {/* Label */}
      <span className="flex-1 text-sm">{label}</span>
      
      {/* Badge com gradiente */}
      {badge !== undefined && badge > 0 && (
        <Badge 
          variant={isActive ? 'default' : 'secondary'}
          className={cn(
            'h-6 min-w-6 px-2 text-xs font-bold',
            'shadow-sm',
            isActive && [
              'bg-gradient-to-r from-blue-500 to-blue-600',
              'text-white border-0',
              'shadow-blue-500/25'
            ]
          )}
        >
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}

      {/* Hover glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-xl opacity-0',
        'bg-gradient-to-r from-blue-500/5 to-purple-500/5',
        'group-hover:opacity-100 transition-opacity duration-200',
        'pointer-events-none'
      )} />
    </Link>
  );
}