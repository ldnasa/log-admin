'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatarCard } from './UserAvatar';
import { User } from '@/types/auth.types';
import { formatDateTime } from '@/lib/log-utils';
import { MoreHorizontal, Edit, Trash2, Shield } from 'lucide-react';

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      {/* Avatar + Nome + Email */}
      <TableCell>
        <UserAvatarCard
          name={user.name}
          email={user.email}
          avatarId={user.avatarId}
        />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge variant="secondary" className="gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Ativo
        </Badge>
      </TableCell>

      {/* Último Acesso */}
      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
        {user.lastAccess ? formatDateTime(user.lastAccess) : 'Nunca'}
      </TableCell>

      {/* Data de Criação */}
      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
        {formatDateTime(user.createdAt)}
      </TableCell>

      {/* Ações */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(user)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}