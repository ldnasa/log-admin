'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Home, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export function TopBar() {
  const pathname = usePathname();

  // Gerar breadcrumbs baseado no pathname
  const getBreadcrumbs = () => {
    if (pathname === '/') return [{ label: 'Dashboard', href: '/' }];

    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];

    paths.forEach((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-orange-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.href}>
                {index === 0 ? (
                  <Link href={crumb.href}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Home className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-medium">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href}>
                        <Button variant="ghost" size="sm" className="h-8">
                          {crumb.label}
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </Fragment>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}