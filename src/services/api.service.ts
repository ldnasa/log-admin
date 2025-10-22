import { api } from '@/lib/axios';
import { AxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError } from '@/types/api.types';

export class ApiService {
  /**
   * GET request
   */
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await api.get<ApiResponse<T>>(url, config);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao buscar dados');
    }
  }

  /**
   * POST request
   */
  static async post<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await api.post<ApiResponse<T>>(url, payload, config);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao enviar dados');
    }
  }

  /**
   * PUT request
   */
  static async put<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await api.put<ApiResponse<T>>(url, payload, config);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao atualizar dados');
    }
  }

  /**
   * PATCH request
   */
  static async patch<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await api.patch<ApiResponse<T>>(url, payload, config);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao atualizar dados');
    }
  }

  /**
   * DELETE request
   */
  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await api.delete<ApiResponse<T>>(url, config);
      
      if (!data.success) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao deletar dados');
    }
  }

  /**
   * Upload de arquivo
   */
  static async upload<T>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });

      if (!data.success) {
        throw new Error(data.message || 'Erro ao fazer upload');
      }

      return data.data as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao fazer upload');
    }
  }

  /**
   * Download de arquivo
   */
  static async download(url: string, filename: string): Promise<void> {
    try {
      const { data } = await api.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Erro ao fazer download');
    }
  }
}