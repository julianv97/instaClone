import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (item: string) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      return value;
    }
  } catch {
    return undefined;
  }
};
