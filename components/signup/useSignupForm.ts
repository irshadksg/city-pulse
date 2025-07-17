import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import { router } from 'expo-router';
import { useState } from 'react';

type FormField = 'name' | 'email' | 'password' | 'confirm';

export const useSignupForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (field: FormField, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validate = () => {
    const errors: Partial<typeof formValues> = {};
    const { name, email, password, confirm } = formValues;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) errors.name = 'Name is required.';
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (!password) errors.password = 'Password is required.';

    if (!confirm) {
      errors.confirm = 'Confirm Password is required.';
    } else if (password !== confirm) {
      errors.confirm = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      StorageService.setItem(STORAGE_KEYS.SIGNED_UP_USER, {
        name: formValues.name,
        email: formValues.email?.toLowerCase(),
        password: formValues.password,
      });
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleNavigateToLogin = () => {
    router.replace('/(auth)/login');
  };

  return {
    formValues,
    formErrors,
    handleNavigateToLogin,
    handleChange,
    handleSubmit,
  };
};
