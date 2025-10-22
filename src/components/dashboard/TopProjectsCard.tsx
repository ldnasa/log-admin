'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface ProjectError {
  id: number;
  name: string;
  errorCount: number;
  totalLogs: number;
}

interface TopProjectsCardProps {
  projects: ProjectError[];
}

export function TopProjectsCard({ projects }: TopProjectsCardProps) {
  const maxErrors = Math.max(...projects.map((p) => p.errorCount));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Projetos com Mais Erros</CardTitle>
        <AlertCircle className="h-5 w-5 text-error" />
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => {
          const errorRate = Math.round((project.errorCount / project.totalLogs) * 100);
          const barWidth = (project.errorCount / maxErrors) * 100;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {project.name}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {project.errorCount}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={barWidth} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
                    {errorRate}%
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        <Link href="/projects">
          <div className="flex items-center justify-center gap-2 text-sm text-primary hover:underline pt-2">
            Ver todos os projetos
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}