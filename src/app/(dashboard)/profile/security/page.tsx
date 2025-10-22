'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { UserService } from '@/services/user.service';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function SegurancaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);

    try {
      // Chamar API para alterar senha
      await UserService.changePassword(data);

      // Sucesso!
      toast.success('Senha alterada com sucesso!', {
        description: 'Sua senha foi atualizada com segurança.',
      });

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/profile/security');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar senha';
      
      toast.error('Erro ao alterar senha', {
        description: errorMessage,
      });

      throw err; // Re-throw para o form tratar
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

          {/* Formulário de Alteração de Senha */}
          <ChangePasswordForm
            onSubmit={handleChangePassword}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
