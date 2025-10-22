/**
 * Resposta padronizada da API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

/**
 * Erro da API
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  timestamp: string;
  status?: number;
}

/**
 * Opções de requisição
 */
export interface ApiRequestConfig {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}