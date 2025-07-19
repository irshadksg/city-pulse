// components/ui/AppScrollView.tsx

import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { AppView } from './AppView';

export const AppScrollView: React.FC<ScrollViewProps> = ({
  children,
  contentContainerStyle,
  ...rest
}) => {
  return (
    <ScrollView
      {...rest}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.defaultContent, contentContainerStyle]}
    >
      <AppView>{children}</AppView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  defaultContent: {
    flexGrow: 1,
  },
});
