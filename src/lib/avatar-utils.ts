import { AVATARS, getAvatarById } from './avatars';

/**
 * Resolver URL do avatar
 * Aceita ID, URL completa ou null/undefined
 * Sempre retorna uma URL válida
 * 
 * @param avatarIdOrUrl - Pode ser um ID (prof-1), URL completa, ou null/undefined
 * @param fallbackName - Nome para gerar avatar padrão caso não encontre
 * @returns URL válida do avatar
 * 
 * @example
 * resolveAvatarUrl('prof-1', 'João Silva')
 * // → URL do avatar prof-1
 * 
 * @example
 * resolveAvatarUrl(null, 'João Silva')
 * // → https://api.dicebear.com/7.x/avataaars/svg?seed=João%20Silva
 * 
 * @example
 * resolveAvatarUrl('https://example.com/avatar.jpg', 'João')
 * // → https://example.com/avatar.jpg
 */
export function resolveAvatarUrl(
  avatarIdOrUrl: string | undefined | null,
  fallbackName?: string
): string {
  // Se não tem avatar, gera um padrão
  if (!avatarIdOrUrl) {
    if (fallbackName) {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}`;
    }
    return AVATARS[0].url; // Avatar padrão (primeiro da lista)
  }

  // Se já é uma URL completa (http:// ou https://), retorna ela
  if (avatarIdOrUrl.startsWith('http://') || avatarIdOrUrl.startsWith('https://')) {
    return avatarIdOrUrl;
  }

  // Se é um ID, busca no array de avatares
  const avatar = getAvatarById(avatarIdOrUrl);
  if (avatar) {
    return avatar.url;
  }

  // Se não encontrou o ID, gera avatar padrão com o nome
  if (fallbackName) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}`;
  }

  // Último recurso: primeiro avatar da lista
  return AVATARS[0].url;
}

/**
 * Gerar iniciais do nome
 * 
 * @param name - Nome completo
 * @returns Iniciais (máximo 2 letras)
 * 
 * @example
 * getInitials('João Silva')
 * // → 'JS'
 * 
 * @example
 * getInitials('Maria')
 * // → 'M'
 * 
 * @example
 * getInitials('')
 * // → '??'
 */
export function getInitials(name: string): string {
  if (!name || name.trim() === '') {
    return '??';
  }

  return name
    .trim()
    .split(' ')
    .filter(n => n.length > 0) // Remove espaços vazios
    .map(n => n[0]) // Pega primeira letra de cada palavra
    .join('')
    .toUpperCase()
    .slice(0, 2); // Máximo 2 letras
}

/**
 * Gerar cor de fundo baseada no nome
 * Útil para fallback quando não tem imagem
 * 
 * @param name - Nome do usuário
 * @returns Classe Tailwind de cor
 * 
 * @example
 * getAvatarColor('João Silva')
 * // → 'bg-blue-500'
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
  ];

  if (!name || name.trim() === '') {
    return colors[0];
  }

  // Gerar hash do nome (simples)
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Usar hash para selecionar cor consistentemente
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Validar se uma string é uma URL válida
 * 
 * @param str - String para validar
 * @returns true se for URL válida
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gerar avatar completo (URL + iniciais + cor) de uma só vez
 * 
 * @param avatarIdOrUrl - ID do avatar ou URL completa
 * @param name - Nome do usuário
 * @returns Objeto com todas as informações do avatar
 * 
 * @example
 * getAvatarData('prof-1', 'João Silva')
 * // → { url: '...', initials: 'JS', color: 'bg-blue-500' }
 */
export function getAvatarData(
  avatarIdOrUrl: string | null | undefined,
  name: string
) {
  return {
    url: resolveAvatarUrl(avatarIdOrUrl, name),
    initials: getInitials(name),
    color: getAvatarColor(name),
  };
}