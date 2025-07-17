import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormInput } from '../ui/FormInput';
import { useSignupForm } from './useSignupForm';

export default function Signup() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { formValues, formErrors, handleNavigateToLogin, handleChange, handleSubmit } =
    useSignupForm();

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
            Sign Up
          </Text>

          <FormInput
            errorMessage={formErrors.name}
            inputProps={{
              label: 'Name *',
              value: formValues.name,
              onChangeText: (text) => handleChange('name', text),
              mode: 'outlined',
              error: !!formErrors.name,
            }}
          />

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

          <FormInput
            errorMessage={formErrors.confirm}
            inputProps={{
              label: 'Confirm Password *',
              value: formValues.confirm,
              onChangeText: (text) => handleChange('confirm', text),
              secureTextEntry: true,
              mode: 'outlined',
              error: !!formErrors.confirm,
            }}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Create Account
          </Button>

          <Text style={styles.haveAccountText} onPress={handleNavigateToLogin}>
            Already have an account? <Text style={styles.loginText}>Login</Text>
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
    loginText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    haveAccountText: {
      textAlign: 'center',
      marginTop: 12,
    },
  });
