import * as SecureStore from "expo-secure-store";
import { decryptData, encryptData } from "./crypto";

export const setSecureStorage = async (key: string, value: any) => {
  const encrypted = encryptData(value);
  await SecureStore.setItemAsync(key, encrypted);
};

export const getSecureStorage = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  if (!value) return null;
  return decryptData(value);
};