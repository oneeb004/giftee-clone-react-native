import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Welcomescreenlogo } from '../../../AppConstant/Icons';
import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { AuthStackScreen } from '../../../navigator/navigation.type';

interface WelcomeScreenProps extends AuthStackScreen<'WelcomeScreen'> {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.container}>
          <View style={styles.centerContent}>
            <Welcomescreenlogo width={160} height={160} />
          </View>

          <View style={styles.footer}>
            <AppButton
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignInScreen');
              }}
              style={styles.button}
            />

            <View style={{ height: 12 }} />

            <AppButton
              title="Sign Up"
              variant="outline"
              onPress={() => {
                navigation.navigate('SignUpScreen');
              }}
              style={styles.button}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  button: {
    width: '100%',
  },
});

export default WelcomeScreen;
