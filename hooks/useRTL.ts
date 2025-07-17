// hooks/useRTL.ts
import { RTLContext } from '@/contexts/RTLProvider';
import { useContext } from 'react';

export const useRTL = () => {
  const context = useContext(RTLContext);
  if (!context) throw new Error('useRTL must be used within RTLProvider');
  return context;
};
