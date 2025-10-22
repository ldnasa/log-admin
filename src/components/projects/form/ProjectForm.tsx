'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, FolderOpen, AlertCircle, Globe } from 'lucide-react';
import { Project, CreateProjectDto, UpdateProjectDto } from '@/types/project.types';

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
    
    // Prevenir múltiplos submits
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Informações do Projeto
          </CardTitle>
          <CardDescription>
            Defina o nome e URL do seu projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              placeholder="Ex: Sistema Principal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              URL do Projeto *
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://meu-projeto.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              URL onde o projeto está hospedado ou repositório
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isActive" className="text-base">
                Projeto Ativo
              </Label>
              <p className="text-sm text-muted-foreground">
                Projetos inativos não podem receber novos logs
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
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/projects')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
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
        </CardContent>
      </Card>
    </form>
  );
}