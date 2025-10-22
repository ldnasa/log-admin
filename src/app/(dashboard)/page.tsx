'use client';

import { useEffect, useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatsGrid, Stat } from '@/components/layout/stats/StatsGrid';
import { MonthlyMetrics } from '@/components/dashboard/MonthlyMetrics';
import { TopProjectsCard } from '@/components/dashboard/TopProjectsCard';
import { RecentLogCard } from '@/components/dashboard/RecentLogCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Layers,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Log, LogLevel } from '@/types/log.types';
import { LogService } from '@/services/log.service';
import { ProjectService } from '@/services/project.service';
import Link from 'next/link';

interface ProjectError {
  id: number;
  name: string;
  errorCount: number;
  totalLogs: number;
}

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [projects, setProjects] = useState<ProjectError[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Buscar logs recentes (últimos 100 para ter uma boa amostra)
        const logsResponse = await LogService.getAll({
          page: 1,
          pageSize: 100,
        });

        // Buscar projetos
        const projectsResponse = await ProjectService.getAllPaginated(1, 100);

        console.log('🔍 Logs Response:', logsResponse);
        console.log('🔍 Projects Response:', projectsResponse);

        // A API retorna 'items' após a conversão do axios
        const allLogs = logsResponse.items || [];
        console.log('📋 Total de logs:', allLogs.length);
        console.log('✅ Logs resolvidos:', allLogs.filter(log => log.isResolved).length);
        
        setLogs(allLogs);

        // Calcular estatísticas de erros por projeto
        const projectStats = projectsResponse.projects.map((project) => {
          const projectLogs = allLogs.filter(
            (log) => log.projectId === project.id
          );
          const errorCount = projectLogs.filter(
            (log) => log.level === LogLevel.ERROR
          ).length;

          return {
            id: project.id,
            name: project.name,
            errorCount,
            totalLogs: projectLogs.length,
          };
        });

        // Ordenar por quantidade de erros e pegar top 3
        const topProjects = projectStats
          .filter((p) => p.totalLogs > 0)
          .sort((a, b) => b.errorCount - a.errorCount)
          .slice(0, 3);

        setProjects(topProjects);
      } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Calcular estatísticas dos logs
  const stats = useMemo(() => {
    const total = logs.length;
    const errors = logs.filter((log) => log.level === LogLevel.ERROR && !log.isResolved).length;
    const warnings = logs.filter((log) => log.level === LogLevel.WARN && !log.isResolved).length;
    const infos = logs.filter((log) => log.level === LogLevel.INFO).length;
    const resolved = logs.filter((log) => log.isResolved).length;
    const pending = logs.filter((log) => !log.isResolved && log.level !== LogLevel.INFO).length;

    return { total, errors, warnings, infos, resolved, pending };
  }, [logs]);

  // Estatísticas para o grid
  const statsData: Stat[] = useMemo(
    () => [
      {
        label: 'Total de Logs',
        value: stats.total,
        icon: Layers,
        variant: 'default',
      },
      {
        label: 'Erros Ativos',
        value: stats.errors,
        icon: AlertCircle,
        variant: 'error',
      },
      {
        label: 'Avisos',
        value: stats.warnings,
        icon: AlertTriangle,
        variant: 'warning',
      },
      {
        label: 'Resolvidos',
        value: stats.resolved,
        icon: CheckCircle2,
        variant: 'success',
      },
    ],
    [stats]
  );

  // Logs resolvidos recentemente
  const recentResolved = useMemo(() => {
    return logs
      .filter((log) => log.isResolved)
      .sort((a, b) => {
        const dateA = new Date(a.resolvedAt || a.timeStamp).getTime();
        const dateB = new Date(b.resolvedAt || b.timeStamp).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [logs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <PageHeader
            title="Dashboard"
            description="Visão geral do sistema de logs"
            badges={[
              {
                label: `${stats.pending} pendentes`,
                variant: 'outline',
                icon: AlertCircle,
              },
            ]}
          />

          {/* Stats Grid */}
          <StatsGrid stats={statsData} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna 1 e 2: Logs Resolvidos Recentemente */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Resolvidos Recentemente</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/logs/">
                      Ver todos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentResolved.length > 0 ? (
                    recentResolved.map((log) => (
                      <RecentLogCard key={log.guid} log={log} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum log resolvido recentemente
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coluna 3: Métricas e Top Projetos */}
            <div className="space-y-6">
              <MonthlyMetrics
                resolved={stats.resolved}
                pending={stats.pending}
                total={stats.resolved + stats.pending}
                goal={200}
              />

              {projects.length > 0 && <TopProjectsCard projects={projects} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}