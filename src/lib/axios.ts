import axios, { AxiosError } from 'axios';
import { env } from '@/config/env';
import { AuthService } from '@/services/auth.service';
import { ApiError, ApiResponse } from '@/types/api.types';

// Criar instância do Axios
export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Converter objeto de PascalCase para camelCase (RECURSIVO)
 */
function toCamelCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Se for Date, retorna como está
  if (obj instanceof Date) {
    return obj;
  }

  // Se for Array, mapeia cada item
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }

  // Se não for objeto, retorna como está
  if (typeof obj !== 'object') {
    return obj;
  }

  // Converter objeto
  const converted: any = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Converter primeira letra para minúscula
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      // Recursivamente converter o valor
      converted[camelKey] = toCamelCase(obj[key]);
    }
  }

  return converted;
}

// Interceptor de Request
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (env.isDevelopment) {
      console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor de Response
api.interceptors.response.use(
  (response) => {
    // Log da resposta ORIGINAL (antes da conversão)
    if (env.isDevelopment) {
      console.log(`🟢 ${response.config.method?.toUpperCase()} ${response.config.url} [ORIGINAL]`, response.data);
    }

    // Converter PascalCase para camelCase
    const convertedData = toCamelCase(response.data);

    // Log da resposta CONVERTIDA
    if (env.isDevelopment) {
      console.log(`🟢 ${response.config.method?.toUpperCase()} ${response.config.url} [CONVERTIDO]`, convertedData);
    }

    // Verificar se a resposta indica erro
    if (convertedData.success === false) {
      const error: ApiError = {
        success: false,
        message: convertedData.message || 'Erro na operação',
        errors: convertedData.errors,
        timestamp: convertedData.timestamp,
        status: response.status,
      };

      console.error('❌ Erro na resposta:', error);
      return Promise.reject(error);
    }

    // Substituir data original pela convertida
    response.data = convertedData;
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      
      // Converter resposta de erro
      const convertedData = toCamelCase(error.response.data);

      const apiError: ApiError = {
        success: false,
        message: convertedData?.message || getErrorMessage(status),
        errors: convertedData?.errors,
        timestamp: convertedData?.timestamp || new Date().toISOString(),
        status,
      };

      console.error(`❌ Erro ${status}:`, apiError);

      // Token inválido ou expirado - fazer logout
      if (status === 401) {
        AuthService.logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(apiError);
    }

    // Erro de rede ou timeout
    if (error.request) {
      const networkError: ApiError = {
        success: false,
        message: 'Erro de conexão com o servidor. Verifique sua internet.',
        timestamp: new Date().toISOString(),
        status: 0,
      };

      console.error('❌ Erro de conexão:', networkError);
      return Promise.reject(networkError);
    }

    // Outros erros
    const genericError: ApiError = {
      success: false,
      message: error.message || 'Erro desconhecido',
      timestamp: new Date().toISOString(),
      status: 0,
    };

    console.error('❌ Erro:', genericError);
    return Promise.reject(genericError);
  }
);

function getErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Requisição inválida',
    401: 'Não autorizado. Faça login novamente.',
    403: 'Acesso negado',
    404: 'Recurso não encontrado',
    409: 'Conflito de dados',
    422: 'Dados inválidos',
    500: 'Erro interno do servidor',
    502: 'Servidor temporariamente indisponível',
    503: 'Serviço indisponível',
  };

  return messages[status] || `Erro ${status}`;
}