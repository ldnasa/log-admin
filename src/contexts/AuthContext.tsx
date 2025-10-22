'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { User } from '@/types/auth.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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
    }

    setLoading(false);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  /**
   * Atualiza os dados do usuário buscando do backend
   */
  const refreshUser = async () => {
    try {
      const currentUser = AuthService.getUser();
      
      if (!currentUser) {
        console.warn('Nenhum usuário logado para atualizar');
        return;
      }

      // Usar guid se disponível, senão id
      const identifier = currentUser.guid || currentUser.id;

      if (!identifier) {
        console.error('Usuário sem guid ou id');
        return;
      }

      console.log('Atualizando dados do usuário:', identifier);

      // Buscar dados atualizados do backend
      const response = await UserService.getById(identifier);

      if (response.success && response.data) {
        const updatedUser = response.data;
        
        console.log('Dados atualizados recebidos:', updatedUser);
        
        // Atualizar no localStorage
        AuthService.saveUser(updatedUser);
        
        // Atualizar no estado do contexto
        setUser(updatedUser);
        
        console.log('✅ Dados do usuário atualizados com sucesso');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      // Em caso de erro, apenas recarrega do localStorage
      checkAuth();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}