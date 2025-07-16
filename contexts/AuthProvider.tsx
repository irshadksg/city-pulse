// hooks/AuthProvider.tsx
import { USER_STORAGE_KEY } from '@/constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useState } from 'react';

export type AuthUser = {
  name: string;
  email: string;
};

interface AuthContextProps {
  loading: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!stored) return false;

      const parsed = JSON.parse(stored);
      if (parsed.email === email?.toLowerCase() && parsed.password === password) {
        setUser({ name: parsed.name, email });
        router.replace('/(tabs)/home');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};
