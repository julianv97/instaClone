import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      return value;
    }
  } catch {
    return undefined;
  }
};
