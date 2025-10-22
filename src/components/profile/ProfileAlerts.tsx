import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertCircle } from 'lucide-react';

interface ProfileAlertsProps {
  success: boolean;
  error: string;
}

export function ProfileAlerts({ success, error }: ProfileAlertsProps) {
  return (
    <>
      {success && (
        <Alert className="border-success bg-success animate-in fade-in slide-in-from-top-2">
          <Check className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            Perfil atualizado com sucesso!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}