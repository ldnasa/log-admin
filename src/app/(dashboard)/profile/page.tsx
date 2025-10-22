'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { validatePassword } from '@/lib/password-utils';
import { UserService } from '@/services/user.service';
import { 
  Shield, 
  Loader2, 
  AlertCircle, 
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  KeyRound
} from 'lucide-react';

export default function SegurancaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleNewPasswordChange = (value: string) => {
    setFormData({ ...formData, newPassword: value });
    setPasswordErrors(validatePassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validações
      if (!formData.currentPassword) {
        setError('Senha atual é obrigatória');
        return;
      }

      if (!formData.newPassword) {
        setError('Nova senha é obrigatória');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const errors = validatePassword(formData.newPassword);
      if (errors.length > 0) {
        setError('A nova senha não atende aos requisitos de segurança');
        return;
      }

      if (formData.newPassword === formData.currentPassword) {
        setError('A nova senha deve ser diferente da atual');
        return;
      }

      // Chamar API para alterar senha
      await UserService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Sucesso!
      toast.success('Senha alterada com sucesso!', {
        description: 'Sua senha foi atualizada com segurança.',
      });

      // Limpar formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors([]);

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar senha';
      setError(errorMessage);
      toast.error('Erro ao alterar senha', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader
            title="Segurança"
            description="Altere sua senha e gerencie a segurança da sua conta"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Alert de Erro */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Alterar Senha */}
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Alterar Senha
                </CardTitle>
                <CardDescription>
                  Mantenha sua conta segura com uma senha forte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Senha Atual */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">
                    Senha Atual <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      disabled={loading}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      disabled={loading}
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Nova Senha */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    Nova Senha <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      disabled={loading}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      disabled={loading}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {/* Requisitos da Senha */}
                  {formData.newPassword && (
                    <div className="space-y-2 text-sm mt-3">
                      <p className="font-medium text-muted-foreground">Requisitos da senha:</p>
                      <div className="space-y-1">
                        <PasswordRequirement
                          met={formData.newPassword.length >= 8}
                          text="Mínimo de 8 caracteres"
                        />
                        <PasswordRequirement
                          met={/[A-Z]/.test(formData.newPassword)}
                          text="Uma letra maiúscula"
                        />
                        <PasswordRequirement
                          met={/[a-z]/.test(formData.newPassword)}
                          text="Uma letra minúscula"
                        />
                        <PasswordRequirement
                          met={/\d/.test(formData.newPassword)}
                          text="Um número"
                        />
                        <PasswordRequirement
                          met={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)}
                          text="Um caractere especial"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmar Nova Senha <span className="text-error">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      disabled={loading}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      disabled={loading}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      {formData.newPassword === formData.confirmPassword ? (
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
              </CardContent>
            </Card>

            {/* Botões de Ação */}
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
                    Alterando...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Alterar Senha
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para requisitos da senha
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