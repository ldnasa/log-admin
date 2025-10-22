/**
 * Validar requisitos de senha forte
 * @param password - Senha a ser validada
 * @returns Array de erros (vazio se válido)
 */
export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Senha deve ter no mínimo 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial');
  }

  return errors;
}

/**
 * Verificar força da senha
 * @param password - Senha a ser verificada
 * @returns Nível de força (0-4)
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.min(strength, 4);
}

/**
 * Obter label da força da senha
 */
export function getPasswordStrengthLabel(strength: number): string {
  const labels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
  return labels[strength] || 'Muito Fraca';
}