'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import {
  Home,
  ChevronRight,
  Layers,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface LogsHeaderProps {
  stats: {
    total: number;
    errors: number;
    warnings: number;
    infos: number;
  };
}

export function LogsHeader({ stats }: LogsHeaderProps) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-orange-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb e actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Logs
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Cards - Compactas */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="border-orange-200 dark:border-slate-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
                <Layers className="h-8 w-8 text-orange-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Erros</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {stats.errors}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-800/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avisos</p>
                  <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.warnings}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Info</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.infos}
                  </p>
                </div>
                <Info className="h-8 w-8 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}