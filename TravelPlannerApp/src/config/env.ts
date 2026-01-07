import Constants from 'expo-constants';

interface Config {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  googleMapsApiKey?: string;
  weatherApiKey?: string;
  sentryDsn?: string;
}

const ENV = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    environment: 'development' as const,
    googleMapsApiKey: '',
    weatherApiKey: '',
  },
  staging: {
    apiUrl: 'https://staging-api.example.com/api',
    environment: 'staging' as const,
    googleMapsApiKey: '',
    weatherApiKey: '',
  },
  production: {
    apiUrl: 'https://api.example.com/api',
    environment: 'production' as const,
    googleMapsApiKey: '',
    weatherApiKey: '',
    sentryDsn: '',
  },
};

const getEnvVars = (): Config => {
  const releaseChannel = Constants.manifest?.releaseChannel;

  if (releaseChannel === undefined) {
    return ENV.development;
  }
  if (releaseChannel.indexOf('prod') !== -1) {
    return ENV.production;
  }
  if (releaseChannel.indexOf('staging') !== -1) {
    return ENV.staging;
  }
  return ENV.development;
};

export default getEnvVars();