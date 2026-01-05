import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/auth.navigator';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/navigator/navigation.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './src/navigator/auth.navigator';
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
