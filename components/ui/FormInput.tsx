import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TextInput, TextInputProps, useTheme } from 'react-native-paper';

interface FormInputProps {
  errorMessage?: string;
  inputProps?: TextInputProps;
}

export const FormInput: React.FC<FormInputProps> = ({ errorMessage, inputProps }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper}>
      <TextInput {...inputProps} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 4,
    },
    input: {
      marginBottom: 0,
    },
    errorText: {
      fontSize: 12,
      color: theme.colors.error,
    },
  });
