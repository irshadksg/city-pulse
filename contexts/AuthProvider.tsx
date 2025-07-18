import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import { User } from '@/types/user.typs';
import React, { createContext, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';

export type AuthUser = {
  name: string;
  email: string;
};

interface AuthContextProps {
  loading: boolean;
  initializing: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const stored: User | null = await StorageService.getItem(STORAGE_KEYS.SIGNED_IN_USER);
      if (stored) {
        setUser(stored);
      }
      setInitializing(false);

      SplashScreen.hideAsync();
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const stored: any = await StorageService.getItem(STORAGE_KEYS.SIGNED_UP_USER);
      if (!stored) return false;

      if (stored?.email === email?.toLowerCase() && stored?.password === password) {
        const useData: User = { name: stored?.name, email };
        StorageService.setItem(STORAGE_KEYS.SIGNED_IN_USER, useData);
        setUser(useData);

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
    StorageService.removeItem(STORAGE_KEYS.SIGNED_IN_USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
