'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail } from 'lucide-react';

interface PersonalInfoSectionProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export function PersonalInfoSection({
  name,
  email,
  onNameChange,
  onEmailChange,
}: PersonalInfoSectionProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-left-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Informações Pessoais
        </CardTitle>
        <CardDescription>
          Atualize seus dados básicos de identificação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu.email@londrinasa.com.br"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}