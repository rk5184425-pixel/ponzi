import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../src/theme/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="simulator" />
          <Stack.Screen name="story" />
          <Stack.Screen name="redflags" />
        </Stack>
        <StatusBar style="light" backgroundColor="#1a1a2e" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}