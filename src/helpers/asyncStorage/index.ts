import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataAsyncStorage = async (item: string) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      return value;
    }
  } catch {
    return undefined;
  }
};

export const setDataAsyncStorage = async (item: string, value: any) => {
  try {
    await AsyncStorage.setItem(item, value);
  } catch {
    return undefined;
  }
};
