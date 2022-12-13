import type { ExpoConfig } from '@expo/config';

const PROJECT_ID = '18474e42-036e-4b01-83d7-db1f3322defb';

const config: ExpoConfig = {
  name: 'my-bank-app',
  slug: 'my-bank-app',
  version: '1.0.0',
  orientation: 'portrait',
  owner: 'astrawan',
  platforms: ['android', 'ios'],
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/18474e42-036e-4b01-83d7-db1f3322defb',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  extra: {
    eas: {
      projectId: PROJECT_ID,
    },
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
};

export default config;
