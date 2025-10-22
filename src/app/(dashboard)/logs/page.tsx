'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Log, LogLevel } from '@/types/log.types';
import { LogService } from '@/services/log.service';
import { formatRelativeDate } from '@/lib/log-utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { useToast } from '@/hooks/useToast';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Layers,
  CheckCircle,
  XCircle 
} from 'lucide-react';

// Componentes
import { LogsFilters } from '@/components/logs/list/LogsFilters';
import { ActiveFilters } from '@/components/logs/list/ActiveFilters';
import { ResultsCounter } from '@/components/logs/list/ResultsCounter';
import { LogCard } from '@/components/logs/list/LogCard';
import { LogsLoading } from '@/components/logs/list/LogsLoading';
import { LogsEmpty } from '@/components/logs/list/LogsEmpty';
import { LogsPagination } from '@/components/logs/list/LogsPagination';
import { Card, CardContent } from '@/components/ui/card';

export default function LogsPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  
  // Estados principais
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<string[]>([]);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedResolved, setSelectedResolved] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    errors: 0,
    warnings: 0,
    infos: 0,
    resolved: 0,
    unresolved: 0,
  });

  // Carregar logs
  useEffect(() => {
    loadLogs();
  }, [currentPage, searchTerm, selectedProject, selectedLevel, selectedResolved]);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      // Montar filtros
      const filters: any = {
        page: currentPage,
        pageSize: itemsPerPage,
      };

      if (searchTerm) filters.searchText = searchTerm;
      if (selectedProject !== 'all') {
        const projectId = parseInt(selectedProject);
        if (!isNaN(projectId)) filters.projectId = projectId;
      }
      if (selectedLevel !== 'all') filters.level = selectedLevel as LogLevel;
      if (selectedResolved === 'resolved') filters.isResolved = true;
      if (selectedResolved === 'unresolved') filters.isResolved = false;

      // Buscar logs
      const response = await LogService.getAll(filters);
      
      setLogs(response.items);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);

      // Extrair projetos únicos
      const uniqueProjects = Array.from(
        new Set(response.items.map((log) => log.projectName))
      );
      setProjects(uniqueProjects);

      // Calcular stats
      calculateStats(response.items);
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao carregar logs', {
        description: apiError.message || 'Não foi possível carregar os logs.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (logsData: Log[]) => {
    setStats({
      total: totalItems,
      errors: logsData.filter((l) => l.level === LogLevel.ERROR).length,
      warnings: logsData.filter((l) => l.level === LogLevel.WARN).length,
      infos: logsData.filter((l) => l.level === LogLevel.INFO).length,
      resolved: logsData.filter((l) => l.isResolved).length,
      unresolved: logsData.filter((l) => !l.isResolved).length,
    });
  };

  // Reset página ao filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProject, selectedLevel, selectedResolved]);

  const hasActiveFilters =
    selectedProject !== 'all' || 
    selectedLevel !== 'all' || 
    selectedResolved !== 'all' || 
    searchTerm !== '';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedProject('all');
    setSelectedLevel('all');
    setSelectedResolved('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader
            title="Logs do Sistema"
            description="Visualize e gerencie todos os logs dos seus projetos"
            badges={[
              { 
                label: `${stats.total} logs`, 
                variant: 'secondary', 
                icon: Layers 
              },
              { 
                label: `${stats.errors} erros`, 
                variant: 'destructive', 
                icon: AlertCircle 
              },
              { 
                label: `${stats.warnings} avisos`, 
                variant: 'outline', 
                icon: AlertTriangle 
              },
              {
                label: `${stats.resolved} resolvidos`,
                variant: 'default',
                icon: CheckCircle
              },
            ]}
          />

          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <LogsFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedResolved={selectedResolved}
                setSelectedResolved={setSelectedResolved}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                projects={projects}
              />

              <ActiveFilters
                searchTerm={searchTerm}
                selectedProject={selectedProject}
                selectedLevel={selectedLevel}
                selectedResolved={selectedResolved}
                onClearSearch={() => setSearchTerm('')}
                onClearProject={() => setSelectedProject('all')}
                onClearLevel={() => setSelectedLevel('all')}
                onClearResolved={() => setSelectedResolved('all')}
                onClearAll={clearAllFilters}
              />
            </CardContent>
          </Card>

          {/* Results Counter */}
          <ResultsCounter
            filteredCount={totalItems}
            totalCount={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          {/* Content */}
          {isLoading ? (
            <LogsLoading />
          ) : logs.length === 0 ? (
            <LogsEmpty
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearAllFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {logs.map((log, index) => (
                  <LogCard
                    key={log.guid}
                    log={log}
                    index={index}
                    formatDate={formatRelativeDate}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <LogsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}