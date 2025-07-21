import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AppText } from './AppText';
import { AppView } from './AppView';

interface Props {
  message: string;
  title?: string;
  retryText?: string;
  onRetryPress?: () => void;
  enableGoBack?: boolean;
}

export const ErrorMessage: React.FC<Props> = ({
  title = 'Oops! Something went wrong.',
  message,
  retryText = 'Retry',
  onRetryPress,
  enableGoBack = false,
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <AppView style={{ flex: 1 }}>
      <AppView style={styles.container}>
        <AppText variant="headlineSmall" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="bodyLarge" style={styles.message}>
          {message}
        </AppText>

        <Button mode="contained" style={styles.button} onPress={onRetryPress}>
          {retryText}
        </Button>

        {enableGoBack && navigation.canGoBack?.() && (
          <Button mode="text" style={styles.button} onPress={handleGoBack}>
            Go Back
          </Button>
        )}
      </AppView>
    </AppView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: 8,
      textAlign: 'center',
      fontWeight: '600',
    },
    message: {
      marginBottom: 12,
      textAlign: 'center',
    },
    button: {
      borderRadius: 8,
      marginTop: 12,
    },
  });
