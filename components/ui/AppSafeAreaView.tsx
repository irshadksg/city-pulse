import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { AppView } from './AppView';

export const AppSafeAreaView: React.FC<SafeAreaViewProps> = ({ children, style, ...rest }) => {
  return (
    <SafeAreaView {...rest} style={styles.safeArea}>
      <AppView style={style}>{children}</AppView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
