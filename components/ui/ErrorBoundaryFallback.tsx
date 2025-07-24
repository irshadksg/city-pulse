// components/ui/ErrorBoundaryFallback.tsx

import { ErrorBoundaryProps } from 'expo-router';
import * as Updates from 'expo-updates';
import React from 'react';
import { ErrorScreen } from './ErrorScreen';

interface ErrorProps extends ErrorBoundaryProps {
  header: { title?: string; show?: boolean };
  enableReloadApp?: boolean;
  buttonTitle?: string;
}

export const ErrorBoundaryFallback: React.FC<ErrorProps> = ({
  header,
  error,
  retry,
  enableReloadApp = false,
  buttonTitle,
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
    <ErrorScreen
      header={header}
      message={errorMessage}
      retryText={buttonTitle || enableReloadApp ? 'Reload App' : 'Retry'}
      onRetryPress={handleReload}
      enableGoBack
    />
  );
};
