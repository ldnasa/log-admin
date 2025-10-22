'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { UsersTable } from '@/components/users/UsersTable';
import { UsersFilters } from '@/components/users/UsersFilters';
import { UsersPagination } from '@/components/users/UsersPagination';
import { UsersEmptyState } from '@/components/users/UsersEmptyState';
import { UsersLoadingSkeleton } from '@/components/users/UsersLoadingSkeleton';
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog';
import { UserService } from '@/services/user.service';
import { useToast } from '@/hooks/useToast';
import { User } from '@/types/auth.types';
import { UserPlus } from 'lucide-react';

export default function UsersPage() {
  const router = useRouter();
  const toast = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalItems / pageSize);

  // Carregar usuários
  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, searchQuery]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.list(currentPage, pageSize);
      
      if (response.data) {
        setUsers(response.data.users);
        setTotalItems(response.data.total);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários', {
        description: 'Não foi possível carregar a lista de usuários.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetar para primeira página
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Resetar para primeira página
  };

  const handleAddUser = () => {
    router.push('/users/new');
  };

  const handleEditUser = (user: User) => {
    router.push(`/users/${user.guid}/edit`);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await UserService.delete(userToDelete.guid);

      toast.success('Usuário excluído', {
        description: `${userToDelete.name} foi removido do sistema.`,
      });

      // Recarregar lista
      loadUsers();
      setUserToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error('Erro ao excluir usuário', {
        description: 'Não foi possível excluir o usuário.',
      });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header com Ação */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <PageHeader
              title="Usuários"
              description="Gerencie os usuários do sistema"
            />
            <Button onClick={handleAddUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>

          {/* Filtros */}
          <UsersFilters onSearch={handleSearch} />

          {/* Conteúdo */}
          {loading ? (
            <UsersLoadingSkeleton />
          ) : users.length === 0 ? (
            <UsersEmptyState
              hasFilters={!!searchQuery}
              onClearFilters={handleClearFilters}
              onAddUser={handleAddUser}
            />
          ) : (
            <>
              <UsersTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />

              {/* Paginação */}
              {totalPages > 1 && (
                <UsersPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={totalItems}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Dialog de Exclusão */}
      <DeleteUserDialog
        user={userToDelete}
        open={!!userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}