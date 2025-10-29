'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  User
} from 'lucide-react';
import { Log } from '@/types/log.types';
import { formatRelativeDate } from '@/lib/log-utils';
import { resolveAvatarUrl } from '@/lib/avatar-utils';
import { cn } from '@/lib/utils';

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
    <div className="space-y-3">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {/* Status Card */}
      <div className={cn(
        'flex items-center justify-between gap-4 p-4',
        'bg-white dark:bg-slate-900',
        'border rounded-lg',
        log.isResolved 
          ? 'border-emerald-200 dark:border-emerald-900/30' 
          : 'border-amber-200 dark:border-amber-900/30'
      )}>
        
        {/* Left: Status Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
            log.isResolved 
              ? 'bg-emerald-100 dark:bg-emerald-950/30' 
              : 'bg-amber-100 dark:bg-amber-950/30'
          )}>
            {log.isResolved ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              {log.isResolved ? 'Resolvido' : 'Pendente'}
            </h3>

            {/* Resolver Info */}
            {log.isResolved && log.resolvedBy ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={avatarUrl} alt={log.resolvedBy} />
                  <AvatarFallback className="text-[10px]">
                    {log.resolvedBy.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-white">{log.resolvedBy}</span>
                  {log.resolvedAt && (
                    <>
                      {' • '}
                      {formatRelativeDate(log.resolvedAt)}
                    </>
                  )}
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Este log requer atenção
              </p>
            )}
          </div>
        </div>

        {/* Right: Action Button */}
        <Button 
          onClick={handleToggle}
          disabled={loading}
          variant={log.isResolved ? 'outline' : 'default'}
          size="sm"
          className="shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : log.isResolved ? (
            <>
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Reabrir
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              Resolver
            </>
          )}
        </Button>
      </div>
    </div>
  );
}