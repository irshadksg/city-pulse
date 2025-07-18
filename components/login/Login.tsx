import { FormInput } from '@/components/ui/FormInput';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormField = 'email' | 'password';

export default function Login() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { login } = useAuth();

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<
    Partial<typeof formValues> & { credentials?: string }
  >({});

  const handleChange = (field: FormField, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field] || formErrors.credentials) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        delete updated.credentials;
        return updated;
      });
    }
  };

  const validate = () => {
    const errors: Partial<typeof formValues> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = 'Email is invalid.';
    }

    if (!formValues.password.trim()) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const success = await login(formValues.email, formValues.password);

    if (!success) {
      setFormErrors((prev) => ({ ...prev, credentials: 'Invalid email or password.' }));
    }
  };

  const goToSignup = () => {
    router.replace('/(auth)/signup');
  };

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

          <Text style={styles.noAccountText} onPress={goToSignup}>
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
