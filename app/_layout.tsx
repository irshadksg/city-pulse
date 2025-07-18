import { queryClient } from '@/configs/query-client';
import { AuthProvider } from '@/contexts/AuthProvider';
import { RTLProvider } from '@/contexts/RTLProvider';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RTLProvider>
          <AuthProvider>
            <AuthGate />
            <StatusBar style="light" />
          </AuthProvider>
        </RTLProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const AuthGate = () => {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    }

    if (user && !inTabsGroup) {
      router.replace('/(tabs)/home');
    }
  }, [user, initializing, segments]);

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};
