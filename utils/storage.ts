import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@citypulse:user';

export const saveUser = async (user: { name: string; email: string; password: string }) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
