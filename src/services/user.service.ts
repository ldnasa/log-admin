import { api } from '@/lib/axios';
import { 
  CreateUserRequest, 
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UsersListResponse 
} from '@/types/user.types';
import { ApiError, ApiResponse } from '@/types/api.types';

export class UserService {
  /**
   * Criar novo usuário
   */
  static async create(userData: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const { data } = await api.post<CreateUserResponse>('/users', userData);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro ao criar usuário');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao criar usuário');
    }
  }

  /**
   * Listar usuários
   */
  static async list(page: number = 1, pageSize: number = 10): Promise<UsersListResponse> {
    try {
      const { data } = await api.get<UsersListResponse>(
        `/users?page=${page}&pageSize=${pageSize}`
      );
      
      if (!data.success) {
        throw new Error(data.message || 'Erro ao listar usuários');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao listar usuários');
    }
  }

  /**
   * Obter usuário por ID ou GUID
   */
  static async getById(id: number | string): Promise<CreateUserResponse> {
    try {
      const { data } = await api.get<CreateUserResponse>(`/users/${id}`);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro ao buscar usuário');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar usuário');
    }
  }

  /**
   * Atualizar dados do usuário
   * @param params - Objeto contendo guid/id e data do usuário
   * @param params.guid - GUID do usuário (opcional, prioritário)
   * @param params.id - ID do usuário (opcional, usado como fallback)
   * @param params.data - Dados a serem atualizados
   * @returns Promise com resposta da atualização
   * @throws Error se não for fornecido guid ou id
   */
  static async update(params: { guid?: string; id?: number; data: UpdateUserRequest }): Promise<UpdateUserResponse> {
    try {
      const identifier = params.guid || params.id;
      
      if (!identifier) {
        throw new Error('É necessário fornecer guid ou id para atualizar o usuário');
      }

      const { data } = await api.put<UpdateUserResponse>(
        `/users/${identifier}`, 
        params.data
      );
      
      if (!data.success) {
        throw new Error(data.message || 'Erro ao atualizar usuário');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao atualizar usuário');
    }
  }

  /**
   * Alterar senha do usuário
   */
  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> {
    try {
      const response = await api.put<ApiResponse>('/users/change-password', data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Erro ao alterar senha');
      }

      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao alterar senha');
    }
  }

  /**
   * Deletar usuário
   */
  static async delete(id: number): Promise<ApiResponse> {
    try {
      const { data } = await api.delete<ApiResponse>(`/users/${id}`);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro ao deletar usuário');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao deletar usuário');
    }
  }
}