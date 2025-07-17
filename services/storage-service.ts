import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (error) {
      console.error(`Failed to store item for key "${key}"`, error);
      throw error;
    }
  },

  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      console.error(`Failed to retrieve item for key "${key}"`, error);
      throw error;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item for key "${key}"`, error);
      throw error;
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage', error);
      throw error;
    }
  },
};
