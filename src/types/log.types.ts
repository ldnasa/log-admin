// ✅ Enum alinhado com o backend C# (valores numéricos)
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface Log {
  id: number;
  guid: string;
  projectId: number;
  projectName: string;
  level: LogLevel;
  levelText?: string;
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
  level?: LogLevel; // ✅ Pode ser 0, 1, 2, 3, 4
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