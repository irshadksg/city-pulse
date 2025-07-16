import { darkTheme, lightTheme } from '@/configs/theme';
import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
