import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import RootStack from './src/navigation';
import color from './src/theme/colors';
import { ThemeProvider } from './src/context/ThemeContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>

    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.safeArea,
          {backgroundColor: isDarkMode ? color.black : color.white},
        ]}
        edges={['top']}>
        <RootStack />
      </SafeAreaView>
    </SafeAreaProvider>
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  main: {flex: 1},
  safeArea: {flex: 1},
});

export default App;
