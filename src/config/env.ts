export const env = {
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // App
  appName: 'Sistema de Logs - Londrina S.A.',
  appVersion: '1.0.0',
} as const;

// Validação de variáveis obrigatórias
if (!env.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL não está definida');
}

// Log de configuração em desenvolvimento
if (env.isDevelopment) {
  console.log('🔧 Configuração da aplicação:', {
    apiUrl: env.apiUrl,
    environment: process.env.NODE_ENV,
  });
}