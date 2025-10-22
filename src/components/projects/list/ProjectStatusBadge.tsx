import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface ProjectStatusBadgeProps {
  isActive: boolean;
}

export function ProjectStatusBadge({ isActive }: ProjectStatusBadgeProps) {
  return (
    <Badge variant={isActive ? 'default' : 'secondary'} className="gap-1">
      {isActive ? (
        <>
          <CheckCircle className="h-3 w-3" />
          Ativo
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3" />
          Inativo
        </>
      )}
    </Badge>
  );
}