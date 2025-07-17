import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import React, { createContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchUser = async () => {
      const stored: any = await StorageService.getItem(STORAGE_KEYS.SIGNED_IN_USER);
      if (stored) {
        setUser(stored);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const stored: any = await StorageService.getItem(STORAGE_KEYS.SIGNED_UP_USER);
      if (!stored) return false;

      // const stored? = JSON.parse(stored);
      if (stored?.email === email?.toLowerCase() && stored?.password === password) {
        const useData = { name: stored?.name, email };
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};
