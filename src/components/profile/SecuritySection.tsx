'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { PasswordMatchIndicator } from './PasswordMatchIndicator';

interface SecuritySectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordErrors: string[];
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

export function SecuritySection({
  currentPassword,
  newPassword,
  confirmPassword,
  passwordErrors,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
}: SecuritySectionProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-right-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Segurança
        </CardTitle>
        <CardDescription>
          Altere sua senha para manter sua conta segura
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Senha Atual */}
        <PasswordInput
          id="currentPassword"
          label="Senha Atual"
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          placeholder="Digite sua senha atual"
          helperText="Obrigatório apenas se você deseja alterar a senha"
        />

        {/* Nova Senha */}
        <div className="space-y-2">
          <PasswordInput
            id="newPassword"
            label="Nova Senha"
            value={newPassword}
            onChange={onNewPasswordChange}
            placeholder="Digite sua nova senha"
          />
          <PasswordStrengthMeter password={newPassword} passwordErrors={passwordErrors} />
        </div>

        {/* Confirmar Senha */}
        <div className="space-y-2">
          <PasswordInput
            id="confirmPassword"
            label="Confirmar Nova Senha"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Confirme sua nova senha"
          />
          <PasswordMatchIndicator
            newPassword={newPassword}
            confirmPassword={confirmPassword}
          />
        </div>
      </CardContent>
    </Card>
  );
}