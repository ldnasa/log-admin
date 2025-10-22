import { useToast } from '@/hooks/useToast';

export function ToastExamples() {
  const toast = useToast();

  // 1. Toast Simples
  const simpleToast = () => {
    toast.success('Operação realizada com sucesso!');
  };

  // 2. Toast com Descrição
  const toastWithDescription = () => {
    toast.info('Novo log registrado', {
      description: 'Log de erro adicionado ao sistema',
    });
  };

  // 3. Toast de Loading
  const loadingToast = async () => {
    const id = toast.loading('Processando...');
    
    // Simular operação
    setTimeout(() => {
      toast.dismiss(id);
      toast.success('Concluído!');
    }, 2000);
  };

  // 4. Toast com Promise
  const promiseToast = () => {
    const fetchData = () => new Promise((resolve) => 
      setTimeout(() => resolve({ name: 'João' }), 2000)
    );

    toast.promise(fetchData(), {
      loading: 'Carregando dados...',
      success: (data: any) => `Bem-vindo, ${data.name}!`,
      error: 'Erro ao carregar dados',
    });
  };

  // 5. Toast com Ação
  const actionToast = () => {
    toast.action('Arquivo salvo', {
      description: 'relatório.pdf foi salvo com sucesso',
      actionLabel: 'Visualizar',
      onAction: () => console.log('Abrindo arquivo...'),
      cancelLabel: 'Fechar',
    });
  };

  // 6. Toast com Undo
  const undoToast = () => {
    let deleted = true;

    toast.undo(
      'Log excluído',
      () => {
        deleted = false;
        toast.success('Log restaurado!');
      },
      {
        description: 'O log foi removido do sistema',
      }
    );
  };

  // 7. Toast de Confirmação
  const confirmToast = () => {
    toast.confirm(
      'Tem certeza?',
      () => {
        toast.success('Ação confirmada!');
      },
      {
        description: 'Esta ação não pode ser desfeita',
      }
    );
  };

  // 8. Toast com Duração Customizada
  const customDuration = () => {
    toast.warning('Sessão expirando em breve', {
      duration: 10000, // 10 segundos
    });
  };

  // 9. Toast Customizado
  const customToast = () => {
    toast.custom(
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="font-bold">Parabéns!</p>
          <p className="text-sm">Você desbloqueou uma conquista</p>
        </div>
      </div>
    );
  };

  // 10. Múltiplos Toasts Sequenciais
  const sequentialToasts = () => {
    toast.info('Iniciando processo...', { duration: 2000 });
    
    setTimeout(() => {
      toast.loading('Processando...', { duration: 2000 });
    }, 2000);
    
    setTimeout(() => {
      toast.success('Processo concluído!');
    }, 4000);
  };

  return null;
}