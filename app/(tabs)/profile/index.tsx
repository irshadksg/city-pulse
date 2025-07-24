import Profile from '@/components/profile/Profile';
import { ErrorBoundaryFallback } from '@/components/ui';
import { ErrorBoundaryProps } from 'expo-router';
import React from 'react';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryFallback header={{ title: 'Profile' }} {...props} />;
}

function ProfileScreen() {
  return <Profile />;
}

export default ProfileScreen;
