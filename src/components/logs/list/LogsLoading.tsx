// components/logs/list/LogsLoading.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LogsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-l-4 border-muted">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="space-y-2 pt-3 border-t">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-36" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}