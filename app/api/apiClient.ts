import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

export async function apiGet<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("GET error:", error);
        throw error;
    }
}