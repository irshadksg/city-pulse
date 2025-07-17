import { queryClient } from '@/configs/query-client';
import { AuthProvider } from '@/contexts/AuthProvider';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

const RootStack = () => {
  const { user } = useAuth();

  // if (user) {
  //   router.replace('/(tabs)/home');
  // }

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

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
        <AuthProvider>
          <RootStack />
          <StatusBar style="light" />
        </AuthProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
