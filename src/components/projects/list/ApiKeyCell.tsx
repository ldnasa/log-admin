'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiKeyCellProps {
  apiKey: string;
  onCopy: (apiKey: string) => void;
}

export function ApiKeyCell({ apiKey, onCopy }: ApiKeyCellProps) {
  const [showKey, setShowKey] = useState(false);
  const maskedKey = `${apiKey.slice(0, 8)}${'•'.repeat(24)}${apiKey.slice(-8)}`;

  return (
    <div className="flex items-center gap-1">
      <code className={cn(
        'text-xs font-mono',
        'bg-slate-50 dark:bg-slate-950',
        'px-2 py-1 rounded',
        'text-slate-700 dark:text-slate-300'
      )}>
        {showKey ? apiKey : maskedKey}
      </code>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => setShowKey(!showKey)}
      >
        {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => onCopy(apiKey)}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}