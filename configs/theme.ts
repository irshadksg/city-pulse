import { AppColors } from '@/constants/Colors';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...AppColors.light,
  },
  roundness: 6,
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AppColors.dark,
  },
  roundness: 6,
};
