import { MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    secondary: '#FFA726',
    background: '#FFFFFF',
    surface: '#F2F2F2',
    onSurface: '#333333',
    text: '#111111',
    error: '#D32F2F',
  },
  roundness: 6,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#0A84FF',
    secondary: '#FFB74D',
    background: '#121212',
    surface: '#1E1E1E',
    onSurface: '#FFFFFF',
    text: '#FFFFFF',
    error: '#EF5350',
  },
  roundness: 6,
};
