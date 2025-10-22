import { api } from '@/lib/axios';
import { Project, CreateProjectDto, UpdateProjectDto } from '@/types/project.types';
import { ApiError } from '@/types/api.types';

interface PaginatedResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class ProjectService {
  /**
   * Lista todos os projetos com paginação
   */
  static async getAllPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    try {
      const { data } = await api.get<PaginatedResponse>('/projects', {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar projetos');
    }
  }

  /**
   * Busca projetos com filtro e paginação
   */
  static async search(name: string, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    try {
      const { data } = await api.get<PaginatedResponse>('/projects/search', {
        params: { name, page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar projetos');
    }
  }

  /**
   * Busca projeto por GUID
   */
  static async getById(guid: string): Promise<Project> {
    try {
      const { data } = await api.get<Project>(`/projects/guid/${guid}`);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Projeto não encontrado');
    }
  }

  /**
   * Cria novo projeto
   */
  static async create(projectData: CreateProjectDto): Promise<Project> {
    try {
      const payload = {
        Name: projectData.name,
        Url: projectData.url,
        IsActive: projectData.isActive,
      };

      const { data } = await api.post<Project>('/projects', payload);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao criar projeto');
    }
  }

  /**
   * Atualiza projeto
   */
  static async update(guid: string, projectData: UpdateProjectDto): Promise<Project> {
    try {
      const payload = {
        Name: projectData.name,
        Url: projectData.url,
        IsActive: projectData.isActive,
      };

      const { data } = await api.put<Project>(`/projects/guid/${guid}`, payload);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao atualizar projeto');
    }
  }

  /**
   * Deleta projeto
   */
  static async delete(guid: string): Promise<void> {
    try {
      await api.delete(`/projects/guid/${guid}`);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao deletar projeto');
    }
  }

  /**
   * Alterna status do projeto
   */
  static async toggleStatus(guid: string, isActive: boolean): Promise<Project> {
    try {
      const { data } = await api.patch<Project>(
        `/projects/${guid}/status`,
        { IsActive: isActive }
      );
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao alterar status do projeto');
    }
  }

  /**
   * Regenera API Key
   */
  static async regenerateApiKey(guid: string): Promise<string> {
    try {
      const { data } = await api.post<Project>(
        `/projects/guid/${guid}/api-key/regenerate`
      );
      return data.apiKey;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao regenerar API Key');
    }
  }

  /**
   * Obtém estatísticas do projeto
   */
  static async getStats(guid: string): Promise<{
    totalLogs: number;
    errorRate: number;
    lastLogAt?: string;
  }> {
    try {
      const { data } = await api.get<{
        totalLogs: number;
        errorRate: number;
        lastLogAt?: string;
      }>(`/projects/guid/${guid}/stats`);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar estatísticas');
    }
  }
}