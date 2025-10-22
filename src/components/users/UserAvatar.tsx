'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { resolveAvatarUrl, getInitials } from '@/lib/avatar-utils';

interface UserAvatarCardProps {
  name: string;
  email: string;
  avatarId?: string | null;
}

export function UserAvatarCard({ name, email, avatarId }: UserAvatarCardProps) {
  const avatarUrl = resolveAvatarUrl(avatarId, name);
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border-2 border-primary/20">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
}