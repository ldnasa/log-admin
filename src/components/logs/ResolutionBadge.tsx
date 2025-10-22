// components/logs/ResolutionBadge.tsx
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';

interface ResolutionBadgeProps {
  isResolved: boolean;
  size?: 'sm' | 'md';
}

export function ResolutionBadge({ isResolved, size = 'md' }: ResolutionBadgeProps) {
  if (isResolved) {
    return (
      <Badge 
        variant="outline" 
        className={`gap-1 border-success text-success ${size === 'sm' ? 'text-xs' : ''}`}
      >
        <CheckCircle2 className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        Resolvido
      </Badge>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className={`gap-1 border-warning text-warning ${size === 'sm' ? 'text-xs' : ''}`}
    >
      <Clock className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      Pendente
    </Badge>
  );
}