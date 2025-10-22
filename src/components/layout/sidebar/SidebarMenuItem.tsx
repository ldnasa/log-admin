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
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative',
        'hover:bg-accent hover:text-accent-foreground',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
      )}

      <Icon
        className={cn(
          'h-5 w-5 transition-transform group-hover:scale-110',
          isActive && 'text-primary'
        )}
      />
      
      <span className="flex-1">{label}</span>
      
      {badge !== undefined && badge > 0 && (
        <Badge variant={isActive ? 'default' : 'secondary'} className="h-5 min-w-5 px-1.5">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
    </Link>
  );
}