'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectForm } from '@/components/projects/form/ProjectForm';
import { useToast } from '@/hooks/useToast';
import { CreateProjectDto } from '@/types/project.types';
import { ProjectService } from '@/services/project.service';

export default function NewProjectPage() {
  const router = useRouter();
  const { success, error } = useToast();

  const handleSubmit = async (data: CreateProjectDto) => {
    try {
      const project = await ProjectService.create(data);

      success('Projeto criado com sucesso!', {
        description: `${project.name} foi criado e a API Key foi gerada automaticamente.`,
      });

      router.push('/projects');
    } catch (err) {
      const apiError = err as Error;
      error('Erro ao criar projeto', {
        description: apiError.message || 'Não foi possível criar o projeto. Tente novamente.',
      });
      throw err; // Re-throw para o formulário parar o loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <PageHeader
            title="Novo Projeto"
            description="Crie um novo projeto e obtenha sua API Key"
          />

          <ProjectForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}