'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import { Plus, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project.types';
import { ProjectService } from '@/services/project.service';
import { ProjectActionsCell } from '@/components/projects/list/ProjectActionsCell';
import { ProjectStatusBadge } from '@/components/projects/list/ProjectStatusBadge';
import { ApiKeyCell } from '@/components/projects/list/ApiKeyCell';
import { ProjectsEmpty } from '@/components/projects/list/ProjectsEmpty';
import { ProjectsLoading } from '@/components/projects/list/ProjectsLoading';
import { DeleteProjectDialog } from '@/components/projects/list/DeleteProjectDialog';
import { formatRelativeDate } from '@/lib/log-utils';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; project: Project | null }>({
    open: false,
    project: null,
  });
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProjects();
  }, [currentPage, searchTerm]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      if (searchTerm.trim()) {
        const data = await ProjectService.search(searchTerm, currentPage, pageSize);
        setProjects(data.projects);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      } else {
        const data = await ProjectService.getAllPaginated(currentPage, pageSize);
        setProjects(data.projects);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao carregar projetos', {
        description: apiError.message || 'Não foi possível carregar os projetos.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    success('API Key copiada!', {
      description: 'A chave foi copiada para a área de transferência.',
    });
  };

  const handleOpenDeleteDialog = (project: Project) => {
    setDeleteDialog({ open: true, project });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.project) return;
    const guid = deleteDialog.project.guid;
    const name = deleteDialog.project.name;

    setActionLoading(guid);
    try {
      await ProjectService.delete(guid);
      setProjects(projects.filter((p) => p.guid !== guid));
      setTotalItems((prev) => prev - 1);
      success('Projeto excluído', {
        description: `${name} foi removido com sucesso.`,
      });
      setDeleteDialog({ open: false, project: null });

      if (projects.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        loadProjects();
      }
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao deletar projeto', {
        description: apiError.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (guid: string, currentStatus: boolean) => {
    setActionLoading(guid);
    try {
      await ProjectService.toggleStatus(guid, !currentStatus);
      setProjects(
        projects.map((p) => (p.guid === guid ? { ...p, isActive: !currentStatus } : p))
      );
      success('Status atualizado', {
        description: `Projeto ${!currentStatus ? 'ativado' : 'desativado'} com sucesso.`,
      });
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao alterar status', {
        description: apiError.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRegenerateKey = async (guid: string) => {
    setActionLoading(guid);
    try {
      const newApiKey = await ProjectService.regenerateApiKey(guid);
      success('API Key regenerada', {
        description: 'Nova chave copiada para a área de transferência.',
      });
      navigator.clipboard.writeText(newApiKey);
      await loadProjects();
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao regenerar API Key', {
        description: apiError.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const stats = {
    total: totalItems,
    active: projects.filter((p) => p.isActive).length,
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Header */}
            <PageHeader
              title="Projetos"
              description="Gerencie os projetos e suas API keys para envio de logs"
              badges={[
                { label: `${stats.total} projetos`, variant: 'secondary' },
                { label: `${stats.active} ativos`, variant: 'default' },
              ]}
              actions={
                <Button onClick={() => router.push('/projects/new')} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Button>
              }
            />

            {/* Search */}
            <div className={cn(
              'bg-white dark:bg-slate-900',
              'border border-slate-200 dark:border-slate-800',
              'rounded-lg p-3'
            )}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nome ou URL..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>

            {/* Content */}
            {isLoading ? (
              <ProjectsLoading />
            ) : projects.length === 0 ? (
              totalItems === 0 && !searchTerm ? (
                <ProjectsEmpty />
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 text-center">
                  <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Nenhum projeto encontrado
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tente ajustar sua busca
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>API Key</TableHead>
                      <TableHead className="text-center">Logs</TableHead>
                      <TableHead>Criado</TableHead>
                      <TableHead>Atualizado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow
                        key={project.guid}
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-slate-500">{project.url}</div>
                          </div>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <ProjectStatusBadge isActive={project.isActive} />
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <ApiKeyCell apiKey={project.apiKey} onCopy={handleCopyApiKey} />
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-medium">{project.logCount || 0}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            {formatRelativeDate(project.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.updatedAt ? (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              {formatRelativeDate(project.updatedAt)}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <ProjectActionsCell
                            project={project}
                            onCopyApiKey={handleCopyApiKey}
                            onDelete={handleOpenDeleteDialog}
                            onToggleStatus={handleToggleStatus}
                            onRegenerateKey={handleRegenerateKey}
                            isLoading={actionLoading === project.guid}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-3">
                    <div className="text-xs text-slate-500">
                      {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} de {totalItems}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-8"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(pageNumber)}
                            className="h-8 w-8 p-0 text-xs"
                          >
                            {pageNumber}
                          </Button>
                        );
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="h-8"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteProjectDialog
        open={deleteDialog.open}
        project={deleteDialog.project}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ open: false, project: null })}
        isLoading={!!actionLoading}
      />
    </>
  );
}