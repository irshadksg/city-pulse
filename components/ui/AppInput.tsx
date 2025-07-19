// components/AppInput.tsx

import { useAppTheme } from '@/hooks/useAppTheme';
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { MD3Theme, TextInput, TextInputProps } from 'react-native-paper';
import { AppText } from './AppText';
import { AppView } from './AppView';

interface AppInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  errorMessage?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  errorMessage,
  placeholder,
  label,
  ...rest
}) => {
  const theme = useAppTheme();
  const { isRTL } = useRTL();

  const styles = createStyles(theme, isRTL);

  const placeholderValue = placeholder || (typeof label === 'string' ? label?.toString() : '');

  return (
    <AppView style={[styles.wrapper, containerStyle]}>
      <TextInput
        {...rest}
        style={[styles.input]}
        mode="outlined"
        placeholder={placeholderValue || ''}
        left={!isRTL && <TextInput.Icon icon="magnify" />}
        right={isRTL && <TextInput.Icon icon="magnify" />}
        theme={{ colors: { primary: theme.colors.primary } }}
        contentStyle={{
          writingDirection: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          paddingRight: isRTL ? 20 : 0,
        }}
      />
      {errorMessage && <AppText style={styles.errorText}>{errorMessage}</AppText>}
    </AppView>
  );
};

const createStyles = (theme: MD3Theme, isRTL: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fff',
      height: 44,
    },
    errorText: {
      marginTop: 6,
      fontSize: 12,
      color: theme.colors.error,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
  });
