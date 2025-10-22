'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PasswordInput } from '@/components/profile/PasswordInput';
import { PasswordRequirements } from '@/components/profile/PasswordRequirements';
import { PasswordMatchIndicator } from '@/components/profile/PasswordMatchIndicator';
import { validatePassword } from '@/lib/password-utils';
import { Shield, Loader2, AlertCircle, Lock, KeyRound } from 'lucide-react';

interface ChangePasswordFormProps {
  onSubmit: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  loading: boolean;
}

export function ChangePasswordForm({ onSubmit, loading }: ChangePasswordFormProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleNewPasswordChange = (value: string) => {
    setFormData({ ...formData, newPassword: value });
    setPasswordErrors(validatePassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

      // Chamar callback
      await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Limpar formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors([]);
      setError('');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar senha';
      setError(errorMessage);
      throw err; // Re-throw para que o componente pai possa tratar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert de Erro */}
      {error && (
        <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Card de Alteração de Senha */}
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
          <PasswordInput
            id="currentPassword"
            label="Senha Atual"
            value={formData.currentPassword}
            onChange={(value) => setFormData({ ...formData, currentPassword: value })}
            disabled={loading}
            required
            icon={Lock}
          />

          {/* Nova Senha */}
          <div className="space-y-2">
            <PasswordInput
              id="newPassword"
              label="Nova Senha"
              value={formData.newPassword}
              onChange={handleNewPasswordChange}
              disabled={loading}
              required
              icon={KeyRound}
            />

            {/* Requisitos da Senha */}
            <PasswordRequirements password={formData.newPassword} />
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <PasswordInput
              id="confirmPassword"
              label="Confirmar Nova Senha"
              value={formData.confirmPassword}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              disabled={loading}
              required
              icon={Lock}
            />

            {/* Indicador de Senhas Coincidentes */}
            <PasswordMatchIndicator
              password={formData.newPassword}
              confirmPassword={formData.confirmPassword}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
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
  );
}