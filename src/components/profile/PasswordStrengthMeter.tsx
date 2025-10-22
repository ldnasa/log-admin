'use client';

import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  passwordErrors: string[];
}

export function PasswordStrengthMeter({
  password,
  passwordErrors,
}: PasswordStrengthMeterProps) {
  if (!password) return null;

  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Fraca', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Média', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: 'Boa', color: 'bg-orange-500' };
    return { strength, label: 'Forte', color: 'bg-green-500' };
  };

  const { strength, label, color } = getPasswordStrength();

  const requirements = [
    'Mínimo 8 caracteres',
    'Uma letra maiúscula',
    'Uma letra minúscula',
    'Um número',
    'Um caractere especial',
  ];

  return (
    <div className="space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {requirements.map((req) => {
          const isMet = !passwordErrors.includes(req);
          return (
            <div
              key={req}
              className={`flex items-center gap-1 ${
                isMet ? 'text-success' : 'text-muted-foreground'
              }`}
            >
              {isMet ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              <span>{req}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}