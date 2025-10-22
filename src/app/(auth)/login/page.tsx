'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { AuthService } from '@/services/auth.service';
import { useToast } from '@/hooks/useToast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Verificar se já está logado
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validações básicas
      if (!formData.email || !formData.password) {
        setError('Preencha todos os campos');
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('E-mail inválido');
        return;
      }

      // Fazer login
      const response = await AuthService.login(formData);

      if (response.data) {
        // Salvar token e dados do usuário
        AuthService.saveToken(response.data.token);
        AuthService.saveUser(response.data);

        // Mostrar toast de sucesso
        toast.success('Login realizado com sucesso!', {
          description: `Bem-vindo, ${response.data.name}!`,
        });

        // Redirecionar para a página original ou dashboard
        const redirect = searchParams.get('redirect') || '/';
        setTimeout(() => {
          router.push(redirect);
          router.refresh();
        }, 500);
      }
    } catch (err) {
      console.error('Erro no login:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.';
      
      setError(errorMessage);
      toast.error('Erro no login', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Sistema de Controle de Logs - Londrina S.A.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Alert de Erro */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@londrinasa.com.br"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                autoComplete="email"
                required
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Botão de Login */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Info adicional */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Desenvolvido pela equipe de TI</p>
            <p className="mt-1">Londrina S.A. © {new Date().getFullYear()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}