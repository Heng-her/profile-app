import AsyncStorage from "@react-native-async-storage/async-storage";
import { decryptData, encryptData } from "./crypto";

export const setStorage = async (key: string, value: any) => {
  try {
    const encrypted = encryptData(value);
    await AsyncStorage.setItem(key, encrypted);
  } catch (error) {
    console.log("Storage Error:", error);
  }
};

export const getStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return decryptData(value);
  } catch (error) {
    console.log("Storage Error:", error);
    return null;
  }
};

export const removeStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};