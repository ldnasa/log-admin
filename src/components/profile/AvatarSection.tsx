  'use client';

  import { useState } from 'react';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Badge } from '@/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { Camera, Check } from 'lucide-react';
  import { AVATARS, Avatar, getAvatarsByCategory } from '@/lib/avatars';
  import { getInitials, resolveAvatarUrl } from '@/lib/avatar-utils';

  import { cn } from '@/lib/utils';

  interface AvatarSectionProps {
    userName: string; // Nome do usuário logado
    selectedAvatarId: string | null;
    onAvatarSelect: (avatarId: string) => void;
  }

  export function AvatarSection({ userName, selectedAvatarId, onAvatarSelect }: AvatarSectionProps) {
    const [isSelectingAvatar, setIsSelectingAvatar] = useState(false);

    // Usar helper para resolver URL do avatar
    const avatarUrl = resolveAvatarUrl(selectedAvatarId, userName);
    const initials = getInitials(userName);

    // Verificar se tem avatar selecionado
    const hasCustomAvatar = selectedAvatarId && AVATARS.some(a => a.id === selectedAvatarId);

    return (
      <Card className="animate-in fade-in slide-in-from-left-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Foto de Perfil
          </CardTitle>
          <CardDescription>
            Escolha um avatar para personalizar seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-muted border-4 border-primary/20">
                <img
                  src={avatarUrl ?? initials}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              </div>
              <Badge
                variant="default"
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full p-0 flex items-center justify-center"
              >
                <Camera className="h-3 w-3" />
              </Badge>
            </div>

            <div className="flex-1">
              <p className="font-medium mb-1">{userName}</p>
              <p className="text-sm text-muted-foreground mb-2">
                {hasCustomAvatar ? 'Avatar personalizado' : 'Avatar padrão'}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSelectingAvatar(!isSelectingAvatar)}
              >
                <Camera className="h-4 w-4 mr-2" />
                {isSelectingAvatar ? 'Fechar Galeria' : 'Escolher Avatar'}
              </Button>
            </div>
          </div>

          {/* Avatar Gallery */}
          {isSelectingAvatar && (
            <div className="border rounded-lg p-4 bg-muted/30 animate-in fade-in slide-in-from-top-2">
              <Tabs defaultValue="professional" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="professional">Profissional</TabsTrigger>
                  <TabsTrigger value="creative">Criativo</TabsTrigger>
                  <TabsTrigger value="friendly">Amigável</TabsTrigger>
                </TabsList>

                <TabsContent value="professional" className="mt-4">
                  <AvatarGrid
                    avatars={getAvatarsByCategory('professional')}
                    selectedId={selectedAvatarId}
                    onSelect={(id) => {
                      onAvatarSelect(id);
                      setIsSelectingAvatar(false);
                    }}
                  />
                </TabsContent>

                <TabsContent value="creative" className="mt-4">
                  <AvatarGrid
                    avatars={getAvatarsByCategory('creative')}
                    selectedId={selectedAvatarId}
                    onSelect={(id) => {
                      onAvatarSelect(id);
                      setIsSelectingAvatar(false);
                    }}
                  />
                </TabsContent>

                <TabsContent value="friendly" className="mt-4">
                  <AvatarGrid
                    avatars={getAvatarsByCategory('friendly')}
                    selectedId={selectedAvatarId}
                    onSelect={(id) => {
                      onAvatarSelect(id);
                      setIsSelectingAvatar(false);
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Grid de Avatares
  interface AvatarGridProps {
    avatars: Avatar[];
    selectedId: string | null;
    onSelect: (id: string) => void;
  }

  function AvatarGrid({ avatars, selectedId, onSelect }: AvatarGridProps) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {avatars.map((avatar) => {
          const isSelected = avatar.id === selectedId;

          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelect(avatar.id)}
              className={cn(
                'relative group aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200',
                'hover:scale-105 hover:shadow-lg',
                isSelected
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <img
                src={avatar.url}
                alt={avatar.name}
                className="h-full w-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

              {/* Check icon when selected */}
              {isSelected && (
                <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}

              {/* Style name on hover */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Estilo {avatar.name.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>
    );
  }