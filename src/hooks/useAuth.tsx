'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types/auth.types';

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    const token = AuthService.getToken();
    const userData = AuthService.getUser();

    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      
      // Se não está na página de login, redireciona
      if (!pathname.startsWith('/login')) {
        router.push('/login');
      }
    }

    setLoading(false);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    refresh: checkAuth,
  };
}