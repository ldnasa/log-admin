'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, FolderOpen, Settings, Plus } from 'lucide-react';

const actions = [
  {
    title: 'Ver Logs',
    description: 'Gerenciar todos os logs',
    icon: FileText,
    href: '/logs',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
  {
    title: 'Projetos',
    description: 'Gerenciar projetos',
    icon: FolderOpen,
    href: '/projects',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    title: 'Novo Projeto',
    description: 'Criar projeto',
    icon: Plus,
    href: '/projects/new',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    title: 'Configurações',
    description: 'Editar perfil',
    icon: Settings,
    href: '/profile/informations',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary/50">
            <CardContent className="p-6">
              <div className={`p-3 rounded-lg ${action.bg} w-fit mb-4`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}