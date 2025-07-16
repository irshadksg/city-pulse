import { useAppTheme } from '@/hooks/useAppTheme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack>
        {/* Authentication */}
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />

        {/* Tab navigation (Home, Profile) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
