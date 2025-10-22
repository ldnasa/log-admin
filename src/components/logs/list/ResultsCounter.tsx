// components/logs/list/ResultsCounter.tsx
interface ResultsCounterProps {
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export function ResultsCounter({
  filteredCount,
  totalCount,
  currentPage,
  totalPages,
}: ResultsCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {filteredCount === totalCount
          ? `${filteredCount} logs no total`
          : `${filteredCount} de ${totalCount} logs`}
      </p>
      {totalPages > 0 && (
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </p>
      )}
    </div>
  );
}