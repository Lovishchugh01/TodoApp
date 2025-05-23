import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './type';

// Modified to use user-specific keys
const getTasksKey = (userEmail: string) => `tasks_${userEmail}`;

export const saveTasks = async (userEmail: string, tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(getTasksKey(userEmail), JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
};

export const loadTasks = async (userEmail: string) => {
  try {
    const tasks = await AsyncStorage.getItem(getTasksKey(userEmail));
    return tasks ? JSON.parse(tasks) : null;
  } catch (e) {
    console.error('Failed to load tasks', e);
    return null;
  }
};