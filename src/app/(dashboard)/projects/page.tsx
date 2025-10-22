'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { Pagination } from '@/components/ui/pagination';
import { formatRelativeDate } from '@/lib/log-utils';

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

  // Pagination state
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
        // Buscar com filtro
        const data = await ProjectService.search(searchTerm, currentPage, pageSize);
        setProjects(data.projects);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      } else {
        // Buscar todos com paginação
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

  // Handler: Copiar API Key
  const handleCopyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    success('API Key copiada!', {
      description: 'A chave foi copiada para a área de transferência.',
    });
  };

  // Handler: Abrir dialog de deletar
  const handleOpenDeleteDialog = (project: Project) => {
    setDeleteDialog({ open: true, project });
  };

  // Handler: Confirmar delete
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

      // Se não há mais itens na página atual, voltar para a anterior
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

  // Handler: Alternar status
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

  // Handler: Regenerar API Key
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

  // Handler: Mudar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handler: Busca com debounce
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  // Estatísticas
  const stats = {
    total: totalItems,
    active: projects.filter((p) => p.isActive).length,
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <PageHeader
              title="Projetos"
              description="Gerencie os projetos e suas API keys para envio de logs"
              badges={[
                { label: `${stats.total} projetos`, variant: 'secondary' },
                { label: `${stats.active} ativos`, variant: 'default' },
              ]}
              actions={
                <Button onClick={() => router.push('/projects/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Button>
              }
            />

            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou URL..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            {isLoading ? (
              <ProjectsLoading />
            ) : projects.length === 0 ? (
              totalItems === 0 && !searchTerm ? (
                <ProjectsEmpty />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
                    <p className="text-sm text-muted-foreground">Tente ajustar sua busca</p>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead className="text-center">Logs</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Última Atualização</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow
                          key={project.guid}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">{project.url}</div>
                            </div>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <ProjectStatusBadge isActive={project.isActive} />
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <ApiKeyCell apiKey={project.apiKey} onCopy={handleCopyApiKey} />
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-medium">{project.logCount || 0}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatRelativeDate(project.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {project.updatedAt ? (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatRelativeDate(project.updatedAt)}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
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
                </CardContent>

                {/* Pagination */}
                {totalPages > 1 && (
                  <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {(currentPage - 1) * pageSize + 1} a{' '}
                      {Math.min(currentPage * pageSize, totalItems)} de {totalItems} projetos
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      <div className="flex items-center gap-1">
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
                              className="w-10"
                            >
                              {pageNumber}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Próximo
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
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