// components/ui/ErrorBoundaryFallback.tsx

import { ErrorBoundaryProps } from 'expo-router';
import * as Updates from 'expo-updates';
import React from 'react';
import { ButtonProps } from 'react-native-paper';
import { ErrorMessage } from './ErrorMessage';

interface ErrorProps extends ErrorBoundaryProps {
  enableReloadApp?: boolean;
  buttonTitle?: string;
  buttonProps?: ButtonProps;
}

export const ErrorBoundaryFallback: React.FC<ErrorProps> = ({
  error,
  retry,
  enableReloadApp = false,
  buttonTitle,
  buttonProps,
}) => {
  const errorMessage = error?.message ?? 'Please try reloading the app.';

  const handleReload = async () => {
    if (enableReloadApp) {
      await Updates.reloadAsync(); // Reload the whole app
    } else {
      retry(); // re-render the route
    }
  };

  return (
    <ErrorMessage
      message={errorMessage}
      retryText={buttonTitle || enableReloadApp ? 'Reload App' : 'Retry'}
      onRetryPress={handleReload}
      enableGoBack
    />
  );
};
