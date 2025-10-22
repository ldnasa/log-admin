// components/logs/detail/LogResolutionCard.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Log } from '@/types/log.types';
import { formatRelativeDate } from '@/lib/log-utils';
import { resolveAvatarUrl } from '@/lib/avatar-utils';

interface LogResolutionCardProps {
  log: Log;
  onToggleResolution: (isResolved: boolean) => Promise<void>;
}

export function LogResolutionCard({ log, onToggleResolution }: LogResolutionCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const avatarUrl = resolveAvatarUrl(log.resolvedByAvatar);

  const handleToggle = async () => {
    setError('');
    setLoading(true);

    try {
      await onToggleResolution(!log.isResolved);
    } catch (err) {
      setError('Erro ao atualizar status. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Status Section */}
      <div className="flex items-center justify-between gap-4 p-6 bg-card border rounded-lg">
        <div className="flex items-start gap-4 flex-1">
          {/* Status Icon & Info */}
          <div className={`p-2.5 rounded-lg ${
            log.isResolved 
              ? 'bg-success text-success' 
              : 'bg-warning text-warning'
          }`}>
            {log.isResolved ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
            ) : (
              <Clock className="h-5 w-5 text-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">
                {log.isResolved ? 'Resolvido' : 'Pendente'}
              </h3>
            </div>

            {/* Informações de quem resolveu */}
            {log.isResolved && log.resolvedBy ? (
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage 
                    src={`${avatarUrl}`} 
                    alt={log.resolvedBy}
                  />
                  <AvatarFallback className="text-xs">
                    {log.resolvedBy.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{log.resolvedBy}</span>
                  {' • '}
                  {log.resolvedAt && formatRelativeDate(log.resolvedAt)}
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Este log requer atenção
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleToggle}
          disabled={loading}
          variant={log.isResolved ? 'outline' : 'default'}
          size="sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : log.isResolved ? (
            <>
              <Clock className="h-4 w-4 mr-2" />
              Reabrir
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Resolver
            </>
          )}
        </Button>
      </div>
    </div>
  );
}