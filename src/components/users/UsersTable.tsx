'use client';

import { Table, TableBody } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { UsersTableHeader } from './UsersTableHeader';
import { UserTableRow } from './UserTableRow';
import { User } from '@/types/auth.types';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4">
      <Table>
        <UsersTableHeader />
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}