import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/AuthScreen/splash/index.tsx';
import WelcomeScreen from '../screens/AuthScreen/welcome_screen/index.tsx';
import SignInScreen from '../screens/AuthScreen/sigin_screen/index.tsx';
import SignUpScreen from '../screens/AuthScreen/signup_screen/index.tsx';
import { AuthStackParamList, RootStackParamList } from './navigation.type.ts';
import OtpVerificationScreen from '../screens/AuthScreen/otp_verfication_screen/otp_verification_Screen.tsx';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
      />
    </AuthStack.Navigator>
  );
}
