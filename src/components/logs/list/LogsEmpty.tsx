// components/logs/list/LogsEmpty.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, X } from 'lucide-react';

interface LogsEmptyProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function LogsEmpty({ hasActiveFilters, onClearFilters }: LogsEmptyProps) {
  if (hasActiveFilters) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhum log encontrado</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tente ajustar os filtros para encontrar o que procura
          </p>
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpar filtros
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum log registrado</h3>
        <p className="text-sm text-muted-foreground">
          Os logs dos seus projetos aparecerão aqui
        </p>
      </CardContent>
    </Card>
  );
}