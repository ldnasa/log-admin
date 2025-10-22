'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordRequirementsProps {
  password: string;
}

interface Requirement {
  test: (password: string) => boolean;
  text: string;
}

const requirements: Requirement[] = [
  {
    test: (pwd) => pwd.length >= 8,
    text: 'Mínimo de 8 caracteres',
  },
  {
    test: (pwd) => /[A-Z]/.test(pwd),
    text: 'Uma letra maiúscula',
  },
  {
    test: (pwd) => /[a-z]/.test(pwd),
    text: 'Uma letra minúscula',
  },
  {
    test: (pwd) => /\d/.test(pwd),
    text: 'Um número',
  },
  {
    test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    text: 'Um caractere especial',
  },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  if (!password) return null;

  return (
    <div className="space-y-2 text-sm mt-3">
      <p className="font-medium text-muted-foreground">Requisitos da senha:</p>
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const met = requirement.test(password);
          return (
            <PasswordRequirement
              key={index}
              met={met}
              text={requirement.text}
            />
          );
        })}
      </div>
    </div>
  );
}

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