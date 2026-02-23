import 'dotenv/config';

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
};