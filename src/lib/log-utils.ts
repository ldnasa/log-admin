// lib/log-utils.ts
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Bug, 
  Skull,
  type LucideIcon 
} from 'lucide-react';
import { LogLevel } from '@/types/log.types';

interface LogLevelConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  badge: 'default' | 'secondary' | 'destructive' | 'outline';
  label: string;
}

/**
 * Retorna configuração visual para cada nível de log
 */
export function getLevelConfig(level: LogLevel): LogLevelConfig {
  const configs: Record<LogLevel, LogLevelConfig> = {
    [LogLevel.DEBUG]: {
      icon: Bug,
      color: 'text-slate-600 dark:text-slate-400',
      bg: 'bg-slate-100 dark:bg-slate-800',
      border: 'border-l-slate-400',
      badge: 'secondary',
      label: 'Debug',
    },
    [LogLevel.INFO]: {
      icon: Info,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-l-blue-400',
      badge: 'outline',
      label: 'Info',
    },
    [LogLevel.WARN]: {
      icon: AlertTriangle,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      border: 'border-l-yellow-400',
      badge: 'outline',
      label: 'Warning',
    },
    [LogLevel.ERROR]: {
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-l-red-400',
      badge: 'destructive',
      label: 'Error',
    },
    [LogLevel.FATAL]: {
      icon: Skull,
      color: 'text-red-900 dark:text-red-300',
      bg: 'bg-red-200 dark:bg-red-950',
      border: 'border-l-red-600',
      badge: 'destructive',
      label: 'Fatal',
    },
  };

  return configs[level] || configs[LogLevel.INFO];
}

/**
 * Formata data para exibição relativa (ex: "há 2 horas")
 */
export function formatRelativeDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'agora mesmo';
  }

  if (diffMinutes < 60) {
    return `há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
  }

  if (diffHours < 24) {
    return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  }

  if (diffDays < 7) {
    return `há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  const years = Math.floor(diffDays / 365);
  return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

/**
 * Formata data para exibição completa (ex: "01/12/2024 às 14:30")
 */
export function formatFullDate(timestamp: string): string {
  const date = new Date(timestamp);
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Alias para formatFullDate (para compatibilidade)
 */
export function formatDateTime(timestamp: string): string {
  return formatFullDate(timestamp);
}

/**
 * Formata data para exibição de dia/hora (ex: "Hoje às 14:30" ou "01/12 às 14:30")
 */
export function formatShortDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timeStr = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  if (isToday) {
    return `Hoje às ${timeStr}`;
  }

  if (isYesterday) {
    return `Ontem às ${timeStr}`;
  }

  const dateStr = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);

  return `${dateStr} às ${timeStr}`;
}

/**
 * Trunca texto longo com reticências
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Formata GUID para exibição compacta
 */
export function formatGuid(guid: string, length: number = 8): string {
  return guid.substring(0, length);
}

/**
 * Retorna cor baseada no nível do log (para uso em classes Tailwind)
 */
export function getLogLevelColor(level: LogLevel): string {
  const colors: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: 'slate',
    [LogLevel.INFO]: 'blue',
    [LogLevel.WARN]: 'yellow',
    [LogLevel.ERROR]: 'red',
    [LogLevel.FATAL]: 'red',
  };

  return colors[level] || 'slate';
}