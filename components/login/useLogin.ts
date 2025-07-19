import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormValues> & { credentials?: string };

export const useLogin = () => {
  const { login } = useAuth();

  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormValues, value: string) => {
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
    const errors: FormErrors = {};
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

  const handleNavigateSignup = () => {
    router.replace('/(auth)/signup');
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleLogin,
    handleNavigateSignup,
  };
};
