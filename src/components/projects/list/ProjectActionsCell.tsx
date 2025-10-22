'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Copy, Pencil, Trash2, Key, ToggleLeft, ToggleRight } from 'lucide-react';
import { Project } from '@/types/project.types';
import { useRouter } from 'next/navigation';

interface ProjectActionsCellProps {
  project: Project;
  onCopyApiKey: (apiKey: string) => void;
  onDelete: (project: Project) => void;
  onToggleStatus: (guid: string, currentStatus: boolean) => void;
  onRegenerateKey: (guid: string) => void;
  isLoading: boolean;
}

export function ProjectActionsCell({
  project,
  onCopyApiKey,
  onDelete,
  onToggleStatus,
  onRegenerateKey,
  isLoading,
}: ProjectActionsCellProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push(`/projects/${project.guid}/edit`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopyApiKey(project.apiKey)}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar API Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRegenerateKey(project.guid)}>
          <Key className="mr-2 h-4 w-4" />
          Regenerar API Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus(project.guid, project.isActive)}>
          {project.isActive ? (
            <>
              <ToggleLeft className="mr-2 h-4 w-4" />
              Desativar
            </>
          ) : (
            <>
              <ToggleRight className="mr-2 h-4 w-4" />
              Ativar
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(project)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4 text-destructive" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}