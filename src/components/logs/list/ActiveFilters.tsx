'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActiveFiltersProps {
  searchTerm: string;
  selectedProject: string;
  selectedLevel: string;
  selectedResolved: string;
  onClearSearch: () => void;
  onClearProject: () => void;
  onClearLevel: () => void;
  onClearResolved: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  searchTerm,
  selectedProject,
  selectedLevel,
  selectedResolved,
  onClearSearch,
  onClearProject,
  onClearLevel,
  onClearResolved,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters =
    searchTerm ||
    selectedProject !== 'all' ||
    selectedLevel !== 'all' ||
    selectedResolved !== 'all';

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
      <span className="text-sm text-muted-foreground">Filtros ativos:</span>

      {searchTerm && (
        <Badge variant="secondary" className="gap-1">
          Busca: {searchTerm}
          <button
            onClick={onClearSearch}
            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {selectedProject !== 'all' && (
        <Badge variant="secondary" className="gap-1">
          Projeto: {selectedProject}
          <button
            onClick={onClearProject}
            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {selectedLevel !== 'all' && (
        <Badge variant="secondary" className="gap-1">
          Nível: {selectedLevel}
          <button
            onClick={onClearLevel}
            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {selectedResolved !== 'all' && (
        <Badge variant="secondary" className="gap-1">
          Status: {selectedResolved === 'resolved' ? 'Resolvidos' : 'Não resolvidos'}
          <button
            onClick={onClearResolved}
            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 text-xs ml-auto"
      >
        Limpar todos
      </Button>
    </div>
  );
}