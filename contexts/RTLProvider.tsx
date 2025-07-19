// providers/RTLProvider.tsx

import { STORAGE_KEYS } from '@/constants/constants';
import { StorageService } from '@/services/storage-service';
import React, { createContext, useEffect, useState } from 'react';

interface RTLContextValue {
  isRTL: boolean;
  toggleRTL: () => void;
}

export const RTLContext = createContext<RTLContextValue>({
  isRTL: false,
  toggleRTL: () => {},
});

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState<boolean>(false);

  useEffect(() => {
    const loadRTL = async () => {
      const stored = await StorageService.getItem(STORAGE_KEYS.RTL_DIRECTION);
      const savedRTL = stored === 'true';
      setIsRTL(savedRTL);
    };

    loadRTL();
  }, []);

  const toggleRTL = async () => {
    const newRTL = !isRTL;
    await StorageService.setItem(STORAGE_KEYS.RTL_DIRECTION, JSON.stringify(newRTL));
    setIsRTL(newRTL);
  };

  return <RTLContext.Provider value={{ isRTL, toggleRTL }}>{children}</RTLContext.Provider>;
};
