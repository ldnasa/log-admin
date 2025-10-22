'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function UsersTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Usuário</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Último Acesso</TableHead>
        <TableHead className="hidden lg:table-cell">Criado em</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}