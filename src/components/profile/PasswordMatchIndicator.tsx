'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordMatchIndicatorProps {
  password: string;
  confirmPassword: string;
}

export function PasswordMatchIndicator({
  password,
  confirmPassword,
}: PasswordMatchIndicatorProps) {
  if (!confirmPassword) return null;

  const matches = password === confirmPassword;

  return (
    <div className="flex items-center gap-2 text-sm mt-2">
      {matches ? (
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
  );
}