import { USER_STORAGE_KEY } from '@/constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user: { name: string; email: string; password: string }) => {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const value = await AsyncStorage.getItem(USER_STORAGE_KEY);
  return value ? JSON.parse(value) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
};
