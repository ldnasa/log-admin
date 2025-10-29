'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Log } from '@/types/log.types';
import { LogService } from '@/services/log.service';
import { formatDateTime } from '@/lib/log-utils';
import { useToast } from '@/hooks/useToast';

// Componentes
import { LogHeroSection } from '@/components/logs/detail/LogHeroSection';
import { QuickInfoGrid } from '@/components/logs/detail/QuickInfoGrid';
import { IdentificationCard } from '@/components/logs/detail/IdentificationCard';
import { OriginCard } from '@/components/logs/detail/OriginCard';
import { DescriptionCard } from '@/components/logs/detail/DescriptionCard';
import { StackTraceCard } from '@/components/logs/detail/StackTraceCard';
import { LogResolutionCard } from '@/components/logs/detail/LogResolutionCard';
import { ActionsFooter } from '@/components/logs/detail/ActionsFooter';
import { LogDetailLoading } from '@/components/logs/detail/LogDetailLoading';
import { LogNotFound } from '@/components/logs/detail/LogNotFound';
import { useAuth } from '@/contexts/AuthContext';

export default function LogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guid = params.guid as string;
  const { success, error: showError, info } = useToast();
  const { user } = useAuth();

  const [log, setLog] = useState<Log | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (guid) {
      loadLog();
    }
  }, [guid]);

  const loadLog = async () => {
    setLoading(true);
    try {
      const data = await LogService.getByGuid(guid);
      setLog(data);
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao carregar log', {
        description: apiError.message || 'Não foi possível carregar o log.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);

    success('Copiado!', {
      description: `${field} copiado para a área de transferência`,
      duration: 2000,
    });
  };

  const handleToggleResolution = async (isResolved: boolean) => {
    if (!log) return;

    try {
      let updatedLog: Log;

      if (isResolved) {
        const userGuid = user?.guid;
        updatedLog = await LogService.markAsResolved(log.guid, userGuid ?? '');
        success('Log marcado como resolvido!', {
          description: 'O status foi atualizado com sucesso.',
        });
      } else {
        updatedLog = await LogService.markAsUnresolved(log.guid);
        info('Log reaberto', {
          description: 'O log foi marcado como pendente novamente.',
        });
      }

      setLog(updatedLog);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      const apiError = error as Error;
      showError('Erro ao atualizar status', {
        description: apiError.message || 'Não foi possível atualizar o status do log.',
      });
    }
  };

  const handleDelete = async () => {
    if (!log) return;

    try {
      await LogService.delete(log.guid);
      success('Log deletado com sucesso!');
      router.push('/logs');
    } catch (error) {
      const apiError = error as Error;
      showError('Erro ao deletar log', {
        description: apiError.message,
      });
    }
  };

  const handleExport = () => {
    if (!log) return;

    const logData = JSON.stringify(log, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `log-${log.guid}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    success('Log exportado!', {
      description: 'O arquivo foi baixado com sucesso.',
    });
  };

  const handleShare = async () => {
    if (!log) return;

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Log do Sistema',
          text: log.message,
          url: url,
        });
        success('Link compartilhado!');
      } catch (error) {
        // Usuário cancelou
      }
    } else {
      copyToClipboard(url, 'Link');
    }
  };

  if (loading) return <LogDetailLoading />;
  if (!log) return <LogNotFound />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        
        {/* Hero Section */}
        <LogHeroSection log={log} formatDateTime={formatDateTime} />

        {/* Resolution Card - Destaque */}
        <LogResolutionCard
          log={log}
          onToggleResolution={handleToggleResolution}
        />

        {/* Quick Info */}
        <QuickInfoGrid
          userName={log.userName || 'Sistema'}
          arquivo={log.fileName || 'N/A'}
          dominio={log.projectName}
          timestamp={log.createdAt}
          formatDateTime={formatDateTime}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IdentificationCard
            guid={log.guid}
            requestId={`req_${log.guid.slice(0, 8)}`}
            metodo={log.method || 'N/A'}
            linha={log.line || 0}
            copiedField={copiedField}
            onCopy={copyToClipboard}
          />

          <OriginCard
            dominio={log.projectName}
            ipOrigem={log.userIP || 'N/A'}
            userAgent="N/A"
          />
        </div>

        {/* Description - Full Width */}
        {log.description && (
          <DescriptionCard
            descricaoCompleta={log.description}
            copiedField={copiedField}
            onCopy={copyToClipboard}
          />
        )}

        {/* Stack Trace - Full Width */}
        {log.stackTrace && (
          <StackTraceCard
            stackTrace={log.stackTrace}
            copiedField={copiedField}
            onCopy={copyToClipboard}
          />
        )}

        {/* Actions Footer */}
        <ActionsFooter
          onDelete={handleDelete}
          onExport={handleExport}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}