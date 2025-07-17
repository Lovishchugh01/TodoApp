import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import RootStack from './src/navigation';
import color from './src/theme/colors';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
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
  );
}

const styles = StyleSheet.create({
  main: {flex: 1},
  safeArea: {flex: 1},
});

export default App;
