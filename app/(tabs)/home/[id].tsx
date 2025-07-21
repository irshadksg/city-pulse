import EventDetails from '@/components/event-details/EventDetails';
import { ErrorBoundaryFallback } from '@/components/ui';
import { ErrorBoundaryProps } from 'expo-router';
import React from 'react';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryFallback {...props} />;
}

const EventDetailsScreen = () => {
  return <EventDetails />;
};

export default EventDetailsScreen;
