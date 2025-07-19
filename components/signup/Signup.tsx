import { AppInput, AppSafeAreaView, AppScrollView, AppText } from '@/components/ui';
import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AppKeyboardAvoidingView } from '../ui/AppKeyboardAvoidingView';
import { useSignupForm } from './useSignupForm';

export default function Signup() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { formValues, formErrors, handleNavigateToLogin, handleChange, handleSubmit } =
    useSignupForm();

  return (
    <AppSafeAreaView style={styles.safeArea}>
      <AppKeyboardAvoidingView>
        <AppScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <AppText variant="titleLarge" style={styles.heading}>
            Sign Up
          </AppText>

          <AppInput
            errorMessage={formErrors.name}
            label={'Name *'}
            value={formValues.name}
            onChangeText={(text) => handleChange('name', text)}
            mode={'outlined'}
            error={!!formErrors.name}
          />

          <AppInput
            errorMessage={formErrors.email}
            label={'Email *'}
            value={formValues.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            mode={'outlined'}
            error={!!formErrors.email}
          />

          <AppInput
            errorMessage={formErrors.password}
            label={'Password *'}
            value={formValues.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={true}
            mode={'outlined'}
            error={!!formErrors.password}
          />

          <AppInput
            errorMessage={formErrors.confirm}
            label={'Confirm Password *'}
            value={formValues.confirm}
            onChangeText={(text) => handleChange('confirm', text)}
            secureTextEntry={true}
            mode={'outlined'}
            error={!!formErrors.confirm}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Create Account
          </Button>

          <AppText style={styles.haveAccountText} onPress={handleNavigateToLogin}>
            Already have an account? <AppText style={styles.loginText}>Login</AppText>
          </AppText>
        </AppScrollView>
      </AppKeyboardAvoidingView>
    </AppSafeAreaView>
  );
}

const createStyles = (theme: AppTheme) =>
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
