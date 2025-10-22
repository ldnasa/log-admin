import { api } from '@/lib/axios';
import {
  LoginRequest,
  LoginResponse,
  User,
  VerifyTokenResponse,
  RefreshTokenResponse,
} from '@/types/auth.types';
import { ApiError } from '@/types/api.types';

export class AuthService {
  /**
   * Fazer login
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      return data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao fazer login');
    }
  }

  /**
   * Salvar token
   */
  static saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      // Salvar também em cookie para o middleware
      document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 dias
    }
  }

  /**
   * Obter token
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Remover token
   */
  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_token=; path=/; max-age=0';
    }
  }

  /**
   * Salvar dados do usuário
   */
  static saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  /**
   * Obter dados do usuário
   */
  static getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  /**
   * Fazer logout
   */
  static async logout(): Promise<void> {
    try {
      // Chamar endpoint de logout no backend (opcional)
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar dados locais
      this.removeToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
        window.location.href = '/login';
      }
    }
  }

  /**
   * Verificar se está autenticado
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Verificar validade do token
   */
  static async verifyToken(): Promise<boolean> {
    try {
      const { data } = await api.get<VerifyTokenResponse>('/auth/verify');
      return data.success && !!data.data?.valid;
    } catch (error) {
      return false;
    }
  }

  /**
   * Refresh token
   */
  static async refreshToken(): Promise<string> {
    try {
      const { data } = await api.post<RefreshTokenResponse>('/auth/refresh');
      
      if (!data.success || !data.data?.token) {
        throw new Error(data.message || 'Erro ao renovar token');
      }

      this.saveToken(data.data.token);
      return data.data.token;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao renovar token');
    }
  }
}