import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { checkLoginStatus, loginUser, logoutUser } from '../utils/auth';
import { Task } from '../utils/type';

type AuthContextType = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  tasks: Task[];
  isLoading: boolean;
  userToken: string | null;
  currentUserEmail: string | null; // Added to track current user
};

const defaultAuthContext: AuthContextType = {
  login: async () => false,
  logout: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  toggleTaskCompletion: async () => {},
  tasks: [],
  isLoading: true,
  userToken: null,
  currentUserEmail: null, // Added default
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null); // Track user email
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const authData = await checkLoginStatus();
        if (authData?.token && authData?.userEmail) {
          setUserToken(authData.token);
          setCurrentUserEmail(authData.userEmail);
          const savedTasks = await loadTasks(authData.userEmail); // Load user-specific tasks
          if (savedTasks) {
            setTasks(savedTasks);
          }
        }
      } catch (e) {
        console.error('Auth initialization error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext: AuthContextType = {
    login: async (email: string, password: string) => {
      try {
        const token = await loginUser(email, password);
        setUserToken(token);
        setCurrentUserEmail(email);
        
        // Load user-specific tasks after login
        const userTasks = await loadTasks(email);
        if (userTasks) {
          setTasks(userTasks);
        } else {
          setTasks([]); // Initialize empty task list for new sessions
        }
        
        return true;
      } catch (error) {
        throw error;
      }
    },
    logout: async () => {
      // Save tasks before logging out
      if (currentUserEmail) {
        await saveTasks(currentUserEmail, tasks);
      }
      await logoutUser();
      setUserToken(null);
      setCurrentUserEmail(null);
      setTasks([]);
    },
    addTask: async (task: Task) => {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      if (currentUserEmail) {
        await saveTasks(currentUserEmail, newTasks);
      }
    },
    updateTask: async (id: string, updatedTask: Partial<Task>) => {
      const newTasks = tasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      );
      setTasks(newTasks);
      if (currentUserEmail) {
        await saveTasks(currentUserEmail, newTasks);
      }
    },
    deleteTask: async (id: string) => {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      if (currentUserEmail) {
        await saveTasks(currentUserEmail, newTasks);
      }
    },
    toggleTaskCompletion: async (id: string) => {
      const newTasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(newTasks);
      if (currentUserEmail) {
        await saveTasks(currentUserEmail, newTasks);
      }
    },
    tasks,
    isLoading,
    userToken,
    currentUserEmail, // Expose current user email
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};