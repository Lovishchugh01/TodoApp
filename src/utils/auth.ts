import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_CREDENTIALS = {
  email: 'test@example.com',
  password: '123456',
};

const AUTH_TOKEN_KEY = 'userToken';
const CURRENT_USER_KEY = 'currentUser'; // New key for storing current user

export const loginUser = async (email: string, password: string) => {
  if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
    const token = Math.random().toString(36).substring(2);
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(CURRENT_USER_KEY, email); // Store user email
    return token;
  }
  throw new Error('Invalid email or password');
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(CURRENT_USER_KEY); // Remove user email on logout
};

export const checkLoginStatus = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    // Return both token and user email
    const userEmail = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return { token, userEmail };
  }
  return null;
};