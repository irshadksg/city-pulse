import { FormInput } from '@/components/ui/FormInput';
import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from './useLogin';

export default function Login() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { formValues, formErrors, handleChange, handleLogin, handleNavigateSignup } = useLogin();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="titleLarge" style={styles.heading}>
            Login
          </Text>

          <FormInput
            errorMessage={formErrors.email}
            inputProps={{
              label: 'Email *',
              value: formValues.email,
              onChangeText: (text) => handleChange('email', text),
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              mode: 'outlined',
              error: !!formErrors.email,
            }}
          />

          <FormInput
            errorMessage={formErrors.password}
            inputProps={{
              label: 'Password *',
              value: formValues.password,
              onChangeText: (text) => handleChange('password', text),
              secureTextEntry: true,
              mode: 'outlined',
              error: !!formErrors.password,
            }}
          />

          {formErrors.credentials && (
            <Text style={{ color: 'red', marginBottom: 8 }}>{formErrors.credentials}</Text>
          )}

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Sign In
          </Button>

          <Text style={styles.noAccountText} onPress={handleNavigateSignup}>
            Don't have an account? <Text style={styles.signUpText}>Signup</Text>{' '}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flex: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
      gap: 12,
      justifyContent: 'center',
    },
    heading: {
      marginBottom: 20,
      color: theme.colors.onBackground,
    },
    button: {
      marginTop: 20,
    },
    signUpText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    noAccountText: {
      textAlign: 'center',
      marginTop: 12,
    },
  });
