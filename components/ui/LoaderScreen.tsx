// components/ui/LoaderScreen.tsx

import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { AppHeader } from './AppHeader';
import { AppText } from './AppText';
import { AppView } from './AppView';

interface LoaderScreenProps {
  header: { title: string; show?: boolean };
  title?: string;
  subtitle?: string;
  size?: 'small' | 'large';
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({
  header,
  title = 'Loading...',
  subtitle,
  size = 'large',
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <AppView style={{ flex: 1 }}>
      {header?.show !== false && (
        <AppHeader title={header.title} rtlToggleAction={{ show: false }} />
      )}

      <AppView style={styles.container}>
        <ActivityIndicator size={size} color={theme.colors.primary} />
        {!!title && (
          <AppText variant="bodyLarge" style={styles.title}>
            {title}
          </AppText>
        )}
        {!!subtitle && (
          <AppText variant="bodyMedium" style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}
      </AppView>
    </AppView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    title: {
      marginTop: 16,
      // fontWeight: '600',
      textAlign: 'center',
    },
    subtitle: {
      marginTop: 8,
      textAlign: 'center',
    },
  });
