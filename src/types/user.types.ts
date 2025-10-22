import { ApiResponse } from './api.types';
import { User } from './auth.types';

/**
 * Dados para criar usuário (corresponde ao CreateUserRequestDto)
 */
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  avatarId?: string;
}

/**
 * Dados para atualizar usuário (corresponde ao UpdateUserRequestDto)
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatarId?: string;
}

/**
 * Resposta de criação de usuário
 */
export type CreateUserResponse = ApiResponse<User>;

/**
 * Resposta de atualização de usuário
 */
export type UpdateUserResponse = ApiResponse<User>;

/**
 * Dados de listagem de usuários (corresponde ao UsersListResponseDto)
 */
export interface UsersListData {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Resposta de listagem de usuários
 */
export type UsersListResponse = ApiResponse<UsersListData>;