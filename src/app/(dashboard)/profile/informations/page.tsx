'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PageHeader } from '@/components/layout/PageHeader';
import { AvatarSection } from '@/components/profile/AvatarSection';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { 
  UserCircle, 
  Loader2, 
  AlertCircle, 
  ArrowLeft,
  Mail,
  User,
  Save
} from 'lucide-react';
import { UserService } from '@/services/user.service';

export default function AlterarDadosPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      setSelectedAvatarId(user.avatarId || null);
    }
  }, [user]);

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'E-mail é obrigatório';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'E-mail inválido';
    }
    return '';
  };

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Nome é obrigatório';
    }
    if (name.trim().length < 3) {
      return 'Nome deve ter pelo menos 3 caracteres';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('🚀 Iniciando handleSubmit');
    console.log('👤 User object:', user);
    console.log('🔑 User GUID:', user?.guid);
    console.log('🔢 User ID:', user?.id);

    // Verificar se temos um usuário válido
    if (!user) {
      setError('Erro: usuário não identificado. Por favor, faça login novamente.');
      return;
    }

    // Usar guid se disponível, senão usar id
    const userIdentifier = user.guid || user.id;
    
    console.log('🎯 Identificador escolhido:', userIdentifier);
    console.log('📦 Tipo do identificador:', typeof userIdentifier);

    if (!userIdentifier) {
      setError('Erro: não foi possível identificar o usuário.');
      return;
    }

    // Validações
    const nameError = validateName(formData.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para envio
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatarId: selectedAvatarId,
      };

      console.log('📤 Dados para enviar:', {
        guid: user.guid,
        id: user.id,
        data: updateData
      });

      // Fazer update no backend (usando guid se disponível, senão id)
      const response = await UserService.update({
        guid: user.guid,
        id: user.id,
        data: updateData
      });

      console.log('✅ Resposta do update:', response);

      // Verificar se a atualização foi bem-sucedida
      if (response.success) {
        // Atualizar contexto do usuário
        await refreshUser();

        // Mostrar mensagem de sucesso
        toast.success('Dados atualizados com sucesso!', {
          description: 'Suas informações foram salvas.',
        });

        // Redirecionar após 1.5 segundos
        setTimeout(() => {
          router.push('/profile/informations');
        }, 1500);
      }

    } catch (err) {
      console.error('❌ Erro ao atualizar dados:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar dados';
      setError(errorMessage);
      toast.error('Erro ao atualizar', {
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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader
            title="Alterar Dados"
            description="Atualize suas informações pessoais e foto de perfil"
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

            {/* Avatar Section */}
            <AvatarSection
              userName={formData.name || user.name}
              selectedAvatarId={selectedAvatarId}
              onAvatarSelect={setSelectedAvatarId}
            />

            {/* Informações Pessoais */}
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-primary" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Mantenha suas informações sempre atualizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome Completo <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
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
                    E-mail <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                      className="pl-10"
                      required
                    />
                  </div>
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
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
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