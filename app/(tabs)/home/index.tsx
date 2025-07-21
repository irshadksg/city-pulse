import Home from '@/components/home/Home';
import { ErrorBoundaryFallback } from '@/components/ui';
import { ErrorBoundaryProps } from 'expo-router';
import React from 'react';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryFallback {...props} />;
}

const HomeScreen = () => {
  return <Home />;
};

export default HomeScreen;
