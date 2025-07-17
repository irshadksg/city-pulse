import { queryClient } from '@/configs/query-client';
import { AuthProvider } from '@/contexts/AuthProvider';
import { RTLProvider } from '@/contexts/RTLProvider';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

// SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const { user } = useAuth();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RTLProvider>
          <AuthProvider>
            <RootStack />
            <StatusBar style="light" />
          </AuthProvider>
        </RTLProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
