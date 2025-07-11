import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Home from '../screens/home';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { AuthContext } from '../context/AuthContext';

// Define your stack param list types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  EditTask: { task: Task };
};

// Define your Task type (should match what you use in EditTask)
type Task = {
  id: string;
  text: string;
  completed: boolean;
  // Add other task properties as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const screenOptions = {
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    contentStyle: { backgroundColor: '#fff' },
    headerShown:false
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'My Tasks' }}
            />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Define styles with TypeScript
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});

export default RootStack;