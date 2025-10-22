// types/log.types.ts

export enum LogLevel {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  FATAL = 'Fatal',
}

export interface Log {
  id: number;
  guid: string;
  projectId: number;
  projectName: string;
  level: LogLevel;
  levelText: string;
  createdAt: string;
  
  // Informações do Usuário/Origem
  userIP?: string;
  userName?: string;
  
  // Informações do Erro/Log
  fileName?: string;
  method?: string;
  line?: number;
  description?: string;
  message: string;
  stackTrace?: string;
  
  // Informações de resolução
  isResolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  resolvedByAvatar?: string;
  resolvedByUserId?: number;
}

export interface LogFilterParams {
  page?: number;
  pageSize?: number;
  level?: LogLevel;
  projectId?: number;
  searchText?: string;
  startDate?: string;
  endDate?: string;
  isResolved?: boolean;
}

export interface LogPagedResponse {
  items: Log[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LogStats {
  period: string;
  totalLogs: number;
  byLevel: {
    debug: number;
    info: number;
    warning: number;
    error: number;
    fatal: number;
  };
  byProject: Array<{
    projectId: number;
    projectName: string;
    count: number;
  }>;
  topErrors: Array<{
    message: string;
    count: number;
  }>;
}