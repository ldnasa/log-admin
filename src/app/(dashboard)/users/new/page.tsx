'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PageHeader } from '@/components/layout/PageHeader';
import { AvatarSelector } from '@/components/users/AvatarSelector';
import { UserService } from '@/services/user.service';
import { useToast } from '@/hooks/useToast';
import { validatePassword } from '@/lib/password-utils';
import { 
  UserPlus, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Mail,
  User,
  Lock,
  ArrowLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function NewUserPage() {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('prof-1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Validar senha em tempo real
  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    setPasswordErrors(validatePassword(value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validações
      if (!formData.name.trim()) {
        setError('Nome é obrigatório');
        return;
      }

      if (!formData.email.trim()) {
        setError('E-mail é obrigatório');
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('E-mail inválido');
        return;
      }

      if (!formData.password) {
        setError('Senha é obrigatória');
        return;
      }

      // Validar requisitos da senha
      const errors = validatePassword(formData.password);
      if (errors.length > 0) {
        setError('A senha não atende aos requisitos de segurança');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      // Criar usuário
      const response = await UserService.create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatarId: selectedAvatarId,
      });

      if (response.data) {
        toast.success('Usuário criado com sucesso!', {
          description: `${response.data.name} foi adicionado ao sistema`,
        });

        // Redirecionar para lista de usuários
        setTimeout(() => {
          router.push('/users');
        }, 1000);
      }
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar usuário';
      setError(errorMessage);
      toast.error('Erro ao criar usuário', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader
            title="Criar Novo Usuário"
            description="Adicione um novo usuário ao sistema de logs"
          />

          {/* Botão Voltar */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          {/* Formulário */}
          <Card className="animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Dados do Usuário
              </CardTitle>
              <CardDescription>
                Preencha os dados abaixo para criar um novo usuário
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Alert de Erro */}
                {error && (
                  <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Avatar */}
                <div className="space-y-2">
                  <Label>Avatar</Label>
                  <AvatarSelector
                    selectedAvatarId={selectedAvatarId}
                    onAvatarSelect={setSelectedAvatarId}
                  />
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome Completo <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={loading}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mail <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao.silva@londrinasa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                      className="pl-10"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Senha <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      disabled={loading}
                      className="pl-10 pr-10"
                      autoComplete="new-password"
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

                  {/* Requisitos da Senha */}
                  {formData.password && (
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-muted-foreground">Requisitos da senha:</p>
                      <div className="space-y-1">
                        <PasswordRequirement
                          met={formData.password.length >= 8}
                          text="Mínimo de 8 caracteres"
                        />
                        <PasswordRequirement
                          met={/[A-Z]/.test(formData.password)}
                          text="Uma letra maiúscula"
                        />
                        <PasswordRequirement
                          met={/[a-z]/.test(formData.password)}
                          text="Uma letra minúscula"
                        />
                        <PasswordRequirement
                          met={/\d/.test(formData.password)}
                          text="Um número"
                        />
                        <PasswordRequirement
                          met={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)}
                          text="Um caractere especial"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmar Senha <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      disabled={loading}
                      className="pl-10 pr-10"
                      autoComplete="new-password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="text-success">As senhas coincidem</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-error" />
                          <span className="text-error">As senhas não coincidem</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || passwordErrors.length > 0}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Criar Usuário
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para mostrar requisitos da senha
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}
      <span className={met ? 'text-success' : 'text-muted-foreground'}>
        {text}
      </span>
    </div>
  );
}