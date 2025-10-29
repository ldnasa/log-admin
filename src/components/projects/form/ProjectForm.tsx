'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, FolderOpen, AlertCircle, Globe, X } from 'lucide-react';
import { Project, CreateProjectDto, UpdateProjectDto } from '@/types/project.types';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
  onSubmit: (data: CreateProjectDto | UpdateProjectDto) => Promise<void>;
}

export function ProjectForm({ project, isEdit = false, onSubmit }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: project?.name || '',
    url: project?.url || '',
    isActive: project?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    setError('');

    // Validações
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (formData.name.length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres');
      return;
    }

    if (!formData.url.trim()) {
      setError('URL é obrigatória');
      return;
    }

    // Validação básica de URL
    try {
      new URL(formData.url);
    } catch {
      setError('URL inválida. Use o formato: https://exemplo.com');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Erro ao salvar projeto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="py-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-6 w-6 p-0"
            onClick={() => setError('')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Alert>
      )}

      {/* Informações Básicas */}
      <div className={cn(
        'bg-white dark:bg-slate-900',
        'border border-slate-200 dark:border-slate-800',
        'rounded-lg p-4'
      )}>
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="w-7 h-7 rounded bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
            <FolderOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Informações do Projeto
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Defina o nome e URL do seu projeto
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Nome do Projeto *
            </Label>
            <Input
              id="name"
              placeholder="Ex: Sistema Principal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-9"
            />
          </div>

          {/* URL */}
          <div className="space-y-1.5">
            <Label htmlFor="url" className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Globe className="h-3 w-3" />
              URL do Projeto *
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://meu-projeto.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="h-9"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              URL onde o projeto está hospedado
            </p>
          </div>

          {/* Status Toggle */}
          <div className={cn(
            'flex items-center justify-between',
            'rounded-lg border border-slate-200 dark:border-slate-800',
            'bg-slate-50 dark:bg-slate-950',
            'p-3'
          )}>
            <div className="flex-1">
              <Label htmlFor="isActive" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
                Projeto Ativo
              </Label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Projetos inativos não recebem novos logs
              </p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={cn(
        'bg-white dark:bg-slate-900',
        'border border-slate-200 dark:border-slate-800',
        'rounded-lg p-4'
      )}>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => router.push('/projects')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm" className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? 'Salvar Alterações' : 'Criar Projeto'}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}