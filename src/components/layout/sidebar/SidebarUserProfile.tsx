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
import { User, Settings, LogOut, ChevronUp, Shield, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { resolveAvatarUrl, getInitials } from '@/lib/avatar-utils';

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
      <DropdownMenuTrigger className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent rounded-lg transition-colors">
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarImage src={avatarUrl} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Submenu de Perfil */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => router.push('/profile/informations')}>
              <UserCircle className="mr-2 h-4 w-4" />
              Alterar Dados
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/profile/security')}>
              <Shield className="mr-2 h-4 w-4" />
              Segurança
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}