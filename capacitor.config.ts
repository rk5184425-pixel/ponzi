import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7765783aa05c4933bd31808dbf33d794',
  appName: 'scam-spotter-guide',
  webDir: 'dist',
  server: {
    url: 'https://7765783a-a05c-4933-bd31-808dbf33d794.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;