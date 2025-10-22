// components/logs/detail/StackTraceCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Copy, Check } from 'lucide-react';

interface StackTraceCardProps {
  stackTrace: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export function StackTraceCard({
  stackTrace,
  copiedField,
  onCopy,
}: StackTraceCardProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Stack Trace
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(stackTrace, 'stack')}
          >
            {copiedField === 'stack' ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-slate-950 dark:bg-slate-900 text-green-400 p-6 rounded-lg text-xs overflow-x-auto">
          <code>{stackTrace}</code>
        </pre>
      </CardContent>
    </Card>
  );
}