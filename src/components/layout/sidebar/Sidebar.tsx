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
  LayoutDashboard,
  Activity,
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

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const unresolvedLogs = await LogService.getUnresolvedCount();
        
        setBadges({
          logs: unresolvedLogs,
          projects: 0,
        });
      } catch (error) {
        console.error('Erro ao buscar badges:', error);
      }
    };

    fetchBadges();
    const interval = setInterval(fetchBadges, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Overlay - Blur Effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Toggle Button - Floating */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'fixed top-4 left-4 z-50 lg:hidden',
          'shadow-lg backdrop-blur-sm',
          'bg-white/80 dark:bg-slate-900/80',
          'hover:bg-white dark:hover:bg-slate-900',
          'border-slate-200 dark:border-slate-800',
          'transition-all duration-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5 transition-transform rotate-90" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Sidebar - Premium Design */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen',
          'w-72',
          // Background com gradiente sutil
          'bg-gradient-to-b from-white via-white to-slate-50/50',
          'dark:from-slate-950 dark:via-slate-900 dark:to-slate-900/50',
          // Border sutil
          'border-r border-slate-200/60 dark:border-slate-800/60',
          'flex flex-col',
          // Animação suave
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Shadow apenas no desktop
          'lg:shadow-sm',
          className
        )}
      >
        {/* Logo Section com gradiente decorativo */}
        <div className="relative">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
          <SidebarLogo />
          {/* Bottom border decorativo */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
        </div>

        {/* Navigation com scroll customizado */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-6 py-6">
            
            {/* Main Navigation */}
            <SidebarMenuSection title="Principal">
              <SidebarMenuItem
                href="/"
                icon={LayoutDashboard}
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
            </SidebarMenuSection>

            {/* Secondary Navigation */}
            <SidebarMenuSection title="Gerenciamento">
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

        {/* User Profile com gradiente decorativo */}
        <div className="relative border-t border-slate-200/60 dark:border-slate-800/60">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10" />
          <div className="relative p-3">
            <SidebarUserProfile />
          </div>
        </div>
      </aside>
    </>
  );
}