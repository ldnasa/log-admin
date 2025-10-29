'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ActionsFooterProps {
  onDelete: () => Promise<void>;
  onExport: () => void;
  onShare: () => Promise<void>;
}

export function ActionsFooter({ onDelete, onExport, onShare }: ActionsFooterProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
      <Button variant="ghost" size="sm" onClick={() => router.push('/logs')}>
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-rose-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}