'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Check } from 'lucide-react';
import { AVATARS, Avatar, getAvatarsByCategory } from '@/lib/avatars';
import { cn } from '@/lib/utils';

interface AvatarSelectorProps {
  selectedAvatarId: string | null;
  onAvatarSelect: (avatarId: string) => void;
}

export function AvatarSelector({ selectedAvatarId, onAvatarSelect }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedAvatar = AVATARS.find((a) => a.id === selectedAvatarId);
  const avatarUrl = selectedAvatar?.url || AVATARS[0].url;

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-muted border-2 border-primary/20">
            <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <Badge
            variant="default"
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
          >
            <Camera className="h-3 w-3" />
          </Badge>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Camera className="h-4 w-4 mr-2" />
          {isOpen ? 'Fechar' : 'Escolher Avatar'}
        </Button>
      </div>

      {/* Gallery */}
      {isOpen && (
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
                  setIsOpen(false);
                }}
              />
            </TabsContent>

            <TabsContent value="creative" className="mt-4">
              <AvatarGrid
                avatars={getAvatarsByCategory('creative')}
                selectedId={selectedAvatarId}
                onSelect={(id) => {
                  onAvatarSelect(id);
                  setIsOpen(false);
                }}
              />
            </TabsContent>

            <TabsContent value="friendly" className="mt-4">
              <AvatarGrid
                avatars={getAvatarsByCategory('friendly')}
                selectedId={selectedAvatarId}
                onSelect={(id) => {
                  onAvatarSelect(id);
                  setIsOpen(false);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
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
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
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

            {isSelected && (
              <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="h-3 w-3" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}