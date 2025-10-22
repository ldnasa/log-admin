import { toast as sonnerToast, ExternalToast } from 'sonner';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2,
  Undo2,
  X
} from 'lucide-react';

interface ToastOptions extends ExternalToast {
  title?: string;
  description?: string;
  duration?: number;
}

interface ActionToastOptions extends ToastOptions {
  actionLabel?: string;
  onAction?: () => void;
  cancelLabel?: string;
}

interface PromiseToastOptions<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: Error) => string);
}

export function useToast() {
  /**
   * Toast de Sucesso
   */
  const success = (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      className: 'group-[.toaster]:bg-success/10 group-[.toaster]:border-success/20',
      ...options,
    });
  };

  /**
   * Toast de Erro
   */
  const error = (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: <XCircle className="h-5 w-5 text-error" />,
      className: 'group-[.toaster]:bg-error/10 group-[.toaster]:border-error/20',
      ...options,
    });
  };

  /**
   * Toast de Aviso
   */
  const warning = (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      className: 'group-[.toaster]:bg-warning/10 group-[.toaster]:border-warning/20',
      ...options,
    });
  };

  /**
   * Toast de Informação
   */
  const info = (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <Info className="h-5 w-5 text-info" />,
      className: 'group-[.toaster]:bg-info/10 group-[.toaster]:border-info/20',
      ...options,
    });
  };

  /**
   * Toast de Loading
   */
  const loading = (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, {
      description: options?.description,
      icon: <Loader2 className="h-5 w-5 animate-spin" />,
      duration: Infinity, // Não fecha automaticamente
      ...options,
    });
  };

  /**
   * Toast com Ação
   */
  const action = (message: string, options: ActionToastOptions) => {
    return sonnerToast(message, {
      description: options.description,
      duration: options.duration || 5000,
      action: options.onAction ? {
        label: options.actionLabel || 'Ação',
        onClick: options.onAction,
      } : undefined,
      cancel: options.cancelLabel ? {
        label: options.cancelLabel,
        onClick: () => sonnerToast.dismiss(),
      } : undefined,
      ...options,
    });
  };

  /**
   * Toast com Undo (Desfazer)
   */
  const undo = (
    message: string, 
    onUndo: () => void, 
    options?: ToastOptions
  ) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      action: {
        label: (
          <span className="flex items-center gap-1">
            <Undo2 className="h-3 w-3" />
            Desfazer
          </span>
        ),
        onClick: onUndo,
      },
      ...options,
    });
  };

  /**
   * Toast para Promises
   */
  const promise = <T,>(
    promise: Promise<T>,
    options: PromiseToastOptions<T>
  ) => {
    return sonnerToast.promise(promise, {
      loading: options.loading,
      success: (data) => {
        return typeof options.success === 'function' 
          ? options.success(data) 
          : options.success;
      },
      error: (err) => {
        return typeof options.error === 'function' 
          ? options.error(err) 
          : options.error;
      },
    });
  };

  /**
   * Toast de Confirmação
   */
  const confirm = (
    message: string,
    onConfirm: () => void,
    options?: ToastOptions
  ) => {
    return sonnerToast(message, {
      description: options?.description,
      duration: options?.duration || 8000,
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      action: {
        label: 'Confirmar',
        onClick: () => {
          onConfirm();
          sonnerToast.dismiss();
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => sonnerToast.dismiss(),
      },
      ...options,
    });
  };

  /**
   * Toast Customizado
   */
  const custom = (component: React.ReactNode, options?: ExternalToast) => {
    return sonnerToast.custom(component, options);
  };

  /**
   * Dismiss (Fechar)
   */
  const dismiss = (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  };

  /**
   * Dismiss All (Fechar Todos)
   */
  const dismissAll = () => {
    return sonnerToast.dismiss();
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    action,
    undo,
    promise,
    confirm,
    custom,
    dismiss,
    dismissAll,
  };
}