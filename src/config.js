// Configuration file that centralizes all environment variables

const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.kicks.dev/v1',
    apiKey: import.meta.env.VITE_API_KEY || '',
  },
  
  // App metadata
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Nike Clone',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  
  // Feature flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.NODE_ENV === 'development',
  },
};

export default config;