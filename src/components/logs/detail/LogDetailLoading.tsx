// components/logs/detail/LogDetailLoading.tsx
export function LogDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="h-20 bg-muted rounded-lg animate-pulse" />
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
}