import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as const,
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal' as const,
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal' as const,
    },
  },
};

export const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    tertiary: '#45b7d1',
    surface: '#1a1a2e',
    background: '#16213e',
    onSurface: '#ffffff',
    onBackground: '#ffffff',
    error: '#ff6b6b',
    warning: '#ffd93d',
    success: '#22c55e',
  },
};

export const colors = {
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
  tertiary: '#45b7d1',
  success: '#22c55e',
  warning: '#ffd93d',
  error: '#ef4444',
  background: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    tertiary: '#0f3460',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b8b8b8',
    muted: '#666666',
  },
  surface: {
    primary: 'rgba(255, 255, 255, 0.05)',
    secondary: 'rgba(255, 255, 255, 0.1)',
  },
};