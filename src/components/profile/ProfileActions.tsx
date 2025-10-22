'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

interface ProfileActionsProps {
  loading: boolean;
  onSubmit: () => void;
}

export function ProfileActions({ loading, onSubmit }: ProfileActionsProps) {
  const router = useRouter();

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="button" className="flex-1" disabled={loading} onClick={onSubmit}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}