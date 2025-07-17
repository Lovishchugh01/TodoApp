import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import {StyleSheet, ViewStyle} from 'react-native';
import {RootStackParamList} from '../utils/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const screenOptions = {
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    contentStyle: {backgroundColor: '#fff'},
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});

export default RootStack;
