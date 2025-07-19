import {
  AppInput,
  AppKeyboardAvoidingView,
  AppSafeAreaView,
  AppScrollView,
  AppText,
} from '@/components/ui';
import { AppTheme } from '@/configs/theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useLogin } from './useLogin';

export default function Login() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { formValues, formErrors, handleChange, handleLogin, handleNavigateSignup } = useLogin();

  return (
    <AppSafeAreaView style={styles.safeArea}>
      <AppKeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <AppScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <AppText variant="titleLarge" style={styles.heading}>
            Login
          </AppText>

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

          {formErrors.credentials && (
            <AppText style={{ color: 'red', marginBottom: 8 }}>{formErrors.credentials}</AppText>
          )}

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Sign In
          </Button>

          <AppText style={styles.noAccountText} onPress={handleNavigateSignup}>
            Don't have an account? <AppText style={styles.signUpText}>Signup</AppText>{' '}
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
