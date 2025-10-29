'use client';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, ChevronUp, Shield, UserCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { resolveAvatarUrl, getInitials } from '@/lib/avatar-utils';
import { cn } from '@/lib/utils';

export function SidebarUserProfile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const avatarUrl = resolveAvatarUrl(user.avatarId, user.name);
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        'group relative w-full px-4 py-3',
        'flex items-center gap-3',
        'rounded-xl',
        'transition-all duration-200',
        'hover:bg-slate-100/80 dark:hover:bg-slate-800/50',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/20'
      )}>
        {/* Avatar com border gradiente */}
        <div className="relative">
          <Avatar className={cn(
            'h-10 w-10',
            'border-2 border-slate-200 dark:border-slate-700',
            'shadow-sm',
            'transition-all duration-200',
            'group-hover:border-blue-400 dark:group-hover:border-blue-500',
            'group-hover:shadow-md group-hover:shadow-blue-500/20',
            'group-hover:scale-105'
          )}>
            <AvatarImage src={avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Status indicator */}
          <div className={cn(
            'absolute bottom-0 right-0',
            'w-3 h-3 rounded-full',
            'bg-gradient-to-br from-emerald-400 to-emerald-500',
            'border-2 border-white dark:border-slate-900',
            'shadow-sm'
          )} />
        </div>

        {/* User Info */}
        <div className="flex-1 text-left min-w-0">
          <p className={cn(
            'text-sm font-semibold leading-none truncate',
            'text-slate-900 dark:text-white'
          )}>
            {user.name}
          </p>
          <p className={cn(
            'text-xs text-slate-500 dark:text-slate-400 mt-1 truncate',
            'group-hover:text-blue-600 dark:group-hover:text-blue-400',
            'transition-colors duration-200'
          )}>
            {user.email}
          </p>
        </div>

        {/* Chevron com animação */}
        <ChevronUp className={cn(
          'h-4 w-4 text-slate-400',
          'transition-all duration-200',
          'group-hover:text-blue-500',
          'group-hover:-translate-y-0.5'
        )} />

        {/* Hover glow effect */}
        <div className={cn(
          'absolute inset-0 rounded-xl opacity-0',
          'bg-gradient-to-r from-blue-500/5 to-purple-500/5',
          'group-hover:opacity-100 transition-opacity duration-200',
          'pointer-events-none'
        )} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          Minha Conta
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Submenu de Perfil */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <User className="mr-2 h-4 w-4 text-blue-500" />
            <span>Perfil</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => router.push('/profile/informations')}>
              <UserCircle className="mr-2 h-4 w-4 text-slate-500" />
              Alterar Dados
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/profile/security')}>
              <Shield className="mr-2 h-4 w-4 text-slate-500" />
              Segurança
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={logout}
          className="text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}