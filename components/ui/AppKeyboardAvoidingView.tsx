import React from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native';
import { AppView } from './AppView';

export const AppKeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  style,
  behavior = Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0,
  ...rest
}) => {
  return (
    <KeyboardAvoidingView
      {...rest}
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
    >
      <AppView style={[{ flex: 1 }, style]}>{children}</AppView>
    </KeyboardAvoidingView>
  );
};
