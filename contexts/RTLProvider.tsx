// providers/RTLProvider.tsx
import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import React, { createContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';

interface RTLContextValue {
  isRTL: boolean;
  toggleRTL: () => void;
}

export const RTLContext = createContext<RTLContextValue>({
  isRTL: I18nManager.isRTL,
  toggleRTL: () => {},
});

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);

  useEffect(() => {
    const loadRTL = async () => {
      const stored = await StorageService.getItem(STORAGE_KEYS.RTL_DIRECTION);
      const savedRTL = stored === 'true';

      if (savedRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(savedRTL);
      }

      setIsRTL(savedRTL);
    };

    loadRTL();
  }, []);

  const toggleRTL = async () => {
    const newRTL = !isRTL;
    await StorageService.setItem(STORAGE_KEYS.RTL_DIRECTION, JSON.stringify(newRTL));
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(newRTL);
    setIsRTL(newRTL);
  };

  console.log('RTLProvider isRTL:', isRTL);
  return <RTLContext.Provider value={{ isRTL, toggleRTL }}>{children}</RTLContext.Provider>;
};
