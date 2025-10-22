import { ApiResponse } from './api.types';

/**
 * Dados de login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Dados do usuário (corresponde ao UserResponseDto do backend)
 */
export interface User {
  id: number;
  name: string;
  email: string;
  guid: string;
  url: string;
  avatarId?: string;
  lastAccess: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dados de resposta do login (corresponde ao LoginResponseDto)
 * IMPORTANTE: Deve conter TODOS os campos do User para evitar problemas
 */
export interface LoginData {
  id: number;
  name: string;
  email: string;
  guid: string; // ✅ ADICIONADO
  url: string; // ✅ ADICIONADO
  avatarId?: string;
  lastAccess: string; // ✅ ADICIONADO
  createdAt: string; // ✅ ADICIONADO
  updatedAt: string; // ✅ ADICIONADO
  token: string;
}

/**
 * Resposta do login
 */
export type LoginResponse = ApiResponse<LoginData>;

/**
 * Resposta de verificação de token
 */
export interface VerifyTokenData {
  valid: boolean;
  user?: User;
}

export type VerifyTokenResponse = ApiResponse<VerifyTokenData>;

/**
 * Resposta de refresh token
 */
export interface RefreshTokenData {
  token: string;
}

export type RefreshTokenResponse = ApiResponse<RefreshTokenData>;