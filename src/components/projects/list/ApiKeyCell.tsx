'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy } from 'lucide-react';

interface ApiKeyCellProps {
  apiKey: string;
  onCopy: (apiKey: string) => void;
}

export function ApiKeyCell({ apiKey, onCopy }: ApiKeyCellProps) {
  const [showKey, setShowKey] = useState(false);

  const maskedKey = `${apiKey.slice(0, 8)}${'•'.repeat(24)}${apiKey.slice(-8)}`;

  return (
    <div className="flex items-center gap-2">
      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
        {showKey ? apiKey : maskedKey}
      </code>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => setShowKey(!showKey)}
      >
        {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => onCopy(apiKey)}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}