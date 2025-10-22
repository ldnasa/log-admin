'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, TrendingUp, Target } from 'lucide-react';

interface MonthlyMetricsProps {
  resolved: number;
  pending: number;
  total: number;
  goal: number;
}

export function MonthlyMetrics({ resolved, pending, total, goal }: MonthlyMetricsProps) {
  const resolutionRate = Math.round((resolved / total) * 100);
  const goalProgress = Math.round((resolved / goal) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Métricas do Mês</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resolvidos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Resolvidos</span>
            </div>
            <span className="text-2xl font-bold text-success">{resolved}</span>
          </div>
          <Progress value={resolutionRate} className="h-2" />
        </div>

        {/* Pendentes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Pendentes</span>
            </div>
            <span className="text-2xl font-bold text-warning">{pending}</span>
          </div>
          <Progress value={100 - resolutionRate} className="h-2" />
        </div>

        {/* Taxa de Resolução */}
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Taxa de Resolução</span>
            </div>
            <span className="text-lg font-bold">{resolutionRate}%</span>
          </div>
         
          {/* Meta do Mês */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Meta: {goal}
              </span>
              <span>{goalProgress}%</span>
            </div>
            <Progress value={goalProgress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}