'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectForm } from '@/components/projects/form/ProjectForm';
import { useToast } from '@/hooks/useToast';
import { UpdateProjectDto, Project } from '@/types/project.types';
import { ProjectService } from '@/services/project.service';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { success, error: showError } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [params.guid]);

  const loadProject = async () => {
    try {
      const data = await ProjectService.getById(params.guid as string);
      setProject(data);
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao carregar projeto', {
        description: apiError.message || 'Não foi possível carregar os dados do projeto.',
      });
      router.push('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: UpdateProjectDto) => {
    try {
      const updated = await ProjectService.update(params.guid as string, data);

      success('Projeto atualizado!', {
        description: `${updated.name} foi atualizado com sucesso.`,
      });

      router.push('/projects');
    } catch (err) {
      const apiError = err as Error;
      showError('Erro ao atualizar projeto', {
        description: apiError.message || 'Não foi possível atualizar o projeto. Tente novamente.',
      });
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Carregando projeto...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <PageHeader
            title="Editar Projeto"
            description={`Edite as informações de ${project.name}`}
          />

          <ProjectForm 
            project={project} 
            isEdit={true} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
}