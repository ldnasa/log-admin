'use client';

import { useEffect, useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatsGrid, Stat } from '@/components/layout/stats/StatsGrid';
import { MonthlyMetrics } from '@/components/dashboard/MonthlyMetrics';
import { TopProjectsCard } from '@/components/dashboard/TopProjectsCard';
import { RecentLogCard } from '@/components/dashboard/RecentLogCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Activity,
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

        const logsResponse = await LogService.getAll({
          page: 1,
          pageSize: 100,
        });

        const projectsResponse = await ProjectService.getAllPaginated(1, 100);

        const allLogs = logsResponse.items || [];
        
        setLogs(allLogs);

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

  const stats = useMemo(() => {
    const total = logs.length;
    const errors = logs.filter((log) => log.level === LogLevel.ERROR && !log.isResolved).length;
    const warnings = logs.filter((log) => log.level === LogLevel.WARN && !log.isResolved).length;
    const infos = logs.filter((log) => log.level === LogLevel.INFO).length;
    const resolved = logs.filter((log) => log.isResolved).length;
    const pending = logs.filter((log) => !log.isResolved && log.level !== LogLevel.INFO).length;

    return { 
      total, 
      errors, 
      warnings, 
      infos, 
      resolved, 
      pending,
    };
  }, [logs]);

  const statsData: Stat[] = useMemo(
    () => [
      {
        label: 'Total de Logs',
        value: stats.total.toLocaleString('pt-BR'),
        icon: Activity,
        variant: 'default',
      },
      {
        label: 'Erros Ativos',
        value: stats.errors.toLocaleString('pt-BR'),
        icon: AlertCircle,
        variant: 'error',
      },
      {
        label: 'Avisos',
        value: stats.warnings.toLocaleString('pt-BR'),
        icon: AlertTriangle,
        variant: 'warning',
      },
      {
        label: 'Resolvidos',
        value: stats.resolved.toLocaleString('pt-BR'),
        icon: CheckCircle2,
        variant: 'success',
      },
    ],
    [stats]
  );

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Carregando dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Stats Grid */}
          <StatsGrid stats={statsData} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Coluna 1 e 2: Logs Resolvidos Recentemente */}
            <div className="lg:col-span-2 space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Logs Resolvidos Recentemente
                    </CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Últimas resoluções do sistema
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="hover:bg-slate-100 dark:hover:bg-slate-800">
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
                    <div className="text-center py-12">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Nenhum log resolvido recentemente
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coluna 3: Métricas e Top Projetos */}
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
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