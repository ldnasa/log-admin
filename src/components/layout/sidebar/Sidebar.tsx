'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  FileText,
  X,
  Menu,
  Globe,
} from 'lucide-react';
import { SidebarLogo } from './SidebarLogo';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuSection } from './SidebarMenuSection';
import { SidebarUserProfile } from './SidebarUserProfile';
import { LogService } from '@/services/log.service';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [badges, setBadges] = useState({
    logs: 0,
    projects: 0,
  });

  // Buscar badges da API
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // Buscar logs não resolvidos
        const unresolvedLogs = await LogService.getUnresolvedCount();
        
        setBadges({
          logs: unresolvedLogs,
          projects: 0, // TODO: Implementar quando tiver ProjectService
        });
      } catch (error) {
        console.error('Erro ao buscar badges:', error);
        // Manter valores anteriores em caso de erro
      }
    };

    // Buscar imediatamente
    fetchBadges();

    // Atualizar badges a cada 30 segundos
    const interval = setInterval(fetchBadges, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen',
          'w-72 bg-card border-r border-border',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Logo */}
        <SidebarLogo />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-6 py-4">
            {/* Main Navigation */}
            <SidebarMenuSection>
              <SidebarMenuItem
                href="/"
                icon={Home}
                label="Dashboard"
                onClick={closeSidebar}
              />
              <SidebarMenuItem
                href="/logs"
                icon={FileText}
                label="Logs"
                badge={badges.logs > 0 ? badges.logs : undefined}
                onClick={closeSidebar}
              />
              <SidebarMenuItem
                href="/projects"
                icon={Globe}
                label="Projetos"
                badge={badges.projects > 0 ? badges.projects : undefined}
                onClick={closeSidebar}
              />
            </SidebarMenuSection>
          </div>
        </ScrollArea>

        {/* User Profile */}
        <div className="border-t border-border p-3">
          <SidebarUserProfile />
        </div>
      </aside>
    </>
  );
}