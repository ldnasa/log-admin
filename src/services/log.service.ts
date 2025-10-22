// services/log.service.ts
import { api } from '@/lib/axios';
import { Log, LogFilterParams, LogPagedResponse, LogStats, LogLevel } from '@/types/log.types';
import { ApiError } from '@/types/api.types';

export class LogService {
  /**
   * Lista logs com filtros e paginação
   */
  static async getAll(params: LogFilterParams = {}): Promise<LogPagedResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params.level) queryParams.append('level', params.level);
      if (params.projectId) queryParams.append('projectId', params.projectId.toString());
      if (params.searchText) queryParams.append('searchText', params.searchText);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.isResolved !== undefined) {
        queryParams.append('isResolved', params.isResolved.toString());
      }

      const { data } = await api.get<LogPagedResponse>(`/logs?${queryParams.toString()}`);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs');
    }
  }

  /**
   * Busca log por GUID
   */
  static async getByGuid(guid: string): Promise<Log> {
    try {
      const { data } = await api.get<Log>(`/logs/guid/${guid}`);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Log não encontrado');
    }
  }

  /**
   * Busca logs por nível
   */
  static async getByLevel(
    level: LogLevel,
    page: number = 1,
    pageSize: number = 50
  ): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>(`/logs/level/${level}`, {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs por nível');
    }
  }

  /**
   * Busca logs recentes
   */
  static async getRecent(hours: number = 24, pageSize: number = 50): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>('/logs/recent', {
        params: { hours, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs recentes');
    }
  }

  /**
   * Busca logs críticos (Error + Fatal)
   */
  static async getCritical(page: number = 1, pageSize: number = 50): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>('/logs/critical', {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs críticos');
    }
  }

  /**
   * Busca logs não resolvidos
   */
  static async getUnresolved(page: number = 1, pageSize: number = 50): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>('/logs/unresolved', {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs não resolvidos');
    }
  }

  /**
   * Busca logs resolvidos
   */
  static async getResolved(page: number = 1, pageSize: number = 50): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>('/logs/resolved', {
        params: { page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar logs resolvidos');
    }
  }

  /**
   * Pesquisa logs por texto
   */
  static async search(
    query: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<LogPagedResponse> {
    try {
      const { data } = await api.get<LogPagedResponse>('/logs/search', {
        params: { q: query, page, pageSize },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao pesquisar logs');
    }
  }

  /**
   * Marca log como resolvido
   * @param guid - GUID do log
   * @param userId - GUID do usuário que está resolvendo
   */
  static async markAsResolved(guid: string, userId: string): Promise<Log> {
    try {
      const { data } = await api.patch<Log>(`/logs/guid/${guid}/resolve`, {
        ResolvedByUserId: userId,
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao marcar log como resolvido');
    }
  }

  /**
   * Marca log como não resolvido
   */
  static async markAsUnresolved(guid: string): Promise<Log> {
    try {
      const { data } = await api.patch<Log>(`/logs/guid/${guid}/unresolve`);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao marcar log como não resolvido');
    }
  }

  /**
   * Deleta log
   */
  static async delete(guid: string): Promise<void> {
    try {
      await api.delete(`/logs/guid/${guid}`);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao deletar log');
    }
  }

  /**
   * Deleta múltiplos logs
   */
  static async deleteBatch(guids: string[]): Promise<{ count: number }> {
    try {
      const { data } = await api.delete<{ count: number }>('/logs/batch', {
        data: guids,
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao deletar logs');
    }
  }

  /**
   * Obtém estatísticas gerais
   */
  static async getStats(days: number = 7): Promise<LogStats> {
    try {
      const { data } = await api.get<LogStats>('/logs/stats', {
        params: { days },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar estatísticas');
    }
  }

  /**
   * Obtém estatísticas de um projeto
   */
  static async getProjectStats(projectId: number, days: number = 7): Promise<any> {
    try {
      const { data } = await api.get(`/logs/projects/${projectId}/stats`, {
        params: { days },
      });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar estatísticas do projeto');
    }
  }

  /**
   * Limpa logs antigos de um projeto
   */
  static async cleanupOldLogs(
    projectId: number,
    days: number = 30
  ): Promise<{ count: number }> {
    try {
      const { data } = await api.delete<{ count: number }>(
        `/logs/projects/${projectId}/cleanup`,
        {
          params: { days },
        }
      );
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao limpar logs antigos');
    }
  }

  /**
   * Conta logs não resolvidos
   */
  static async getUnresolvedCount(): Promise<number> {
    try {
      const response = await api.get<number>('/logs/unresolved/count');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar contagem de logs não resolvidos:', error);
      throw error;
    }
  }

  /**
   * Conta logs por nível (para dashboard)
   */
  static async getCountByLevel(): Promise<Record<string, number>> {
    try {
      const response = await api.get<Record<string, number>>('/logs/count/by-level');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar contagem por nível:', error);
      throw error;
    }
  }
}
