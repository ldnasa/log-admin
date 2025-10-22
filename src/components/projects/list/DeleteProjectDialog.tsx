'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Project } from '@/types/project.types';

interface DeleteProjectDialogProps {
  open: boolean;
  project: Project | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function DeleteProjectDialog({
  open,
  project,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteProjectDialogProps) {
  if (!project) return null;

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle className="text-lg">Excluir Projeto</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            Tem certeza que deseja excluir o projeto{' '}
            <span className="font-semibold text-foreground">{project.name}</span>?
            <br />
            <br />
            Esta ação não pode ser desfeita. Todos os logs associados a este projeto serão
            permanentemente removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              'Excluir Projeto'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}