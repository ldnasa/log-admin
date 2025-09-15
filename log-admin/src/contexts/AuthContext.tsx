import { createContext, useContext, useState, useEffect, type ReactNode,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se existe token ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('@LogSentry:token');
      
      if (token) {
        // Aqui você faria uma chamada para validar o token
        // const response = await api.get('/me');
        
        // Por enquanto, vamos simular
        const userData = localStorage.getItem('@LogSentry:user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      localStorage.removeItem('@LogSentry:token');
      localStorage.removeItem('@LogSentry:user');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Aqui você faria a chamada real para API
      // const response = await api.post('/login', { email, password });
      
      // Simulação de login
      if (email === 'admin@exemplo.com' && password === '123456') {
        const userData = {
          id: '1',
          name: 'Admin',
          email: email,
        };
        
        const token = 'fake-jwt-token';
        
        localStorage.setItem('@LogSentry:token', token);
        localStorage.setItem('@LogSentry:user', JSON.stringify(userData));
        
        setUser(userData);
        message.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error: any) {
      message.error(error.message || 'Erro ao fazer login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@LogSentry:token');
    localStorage.removeItem('@LogSentry:user');
    setUser(null);
    message.info('Logout realizado com sucesso');
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signOut, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};