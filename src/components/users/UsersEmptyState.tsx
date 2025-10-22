'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

interface UsersEmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onAddUser: () => void;
}

export function UsersEmptyState({
  hasFilters,
  onClearFilters,
  onAddUser,
}: UsersEmptyStateProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Users className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {hasFilters ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
          {hasFilters
            ? 'Tente ajustar os filtros de busca para encontrar o que procura.'
            : 'Comece adicionando o primeiro usuário ao sistema.'}
        </p>
        {hasFilters ? (
          <Button variant="outline" onClick={onClearFilters}>
            Limpar Filtros
          </Button>
        ) : (
          <Button onClick={onAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Primeiro Usuário
          </Button>
        )}
      </CardContent>
    </Card>
  );
}