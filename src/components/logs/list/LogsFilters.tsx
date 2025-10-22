'use client';

import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface LogsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedResolved: string;
  setSelectedResolved: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  projects: string[];
}

export function LogsFilters({
  searchTerm,
  setSearchTerm,
  selectedProject,
  setSelectedProject,
  selectedLevel,
  setSelectedLevel,
  selectedResolved,
  setSelectedResolved,
  sortOrder,
  setSortOrder,
  projects,
}: LogsFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por mensagem, GUID ou projeto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros em Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Filtro de Projeto */}
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Projeto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os projetos</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro de Nível */}
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os níveis</SelectItem>
            <SelectItem value="Debug">Debug</SelectItem>
            <SelectItem value="Info">Info</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Error">Error</SelectItem>
            <SelectItem value="Fatal">Fatal</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro de Resolução */}
        <Select value={selectedResolved} onValueChange={setSelectedResolved}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="resolved">Resolvidos</SelectItem>
            <SelectItem value="unresolved">Não resolvidos</SelectItem>
          </SelectContent>
        </Select>

        {/* Ordenação */}
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="w-full"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {sortOrder === 'desc' ? 'Mais recentes' : 'Mais antigos'}
        </Button>
      </div>
    </div>
  );
}