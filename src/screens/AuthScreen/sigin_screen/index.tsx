import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {
  Welcomescreenlogo,
  envelope,
  phoneLogo,
  BackArrow,
} from '../../../AppConstant/Icons';
import CustomTextField from '../../../Component/GlobalComponent/CustomTextField';
import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreen } from '../../../navigator/navigation.type';

type LoginMode = 'phone' | 'email';

interface SignInScreenProps extends AuthStackScreen<'SignInScreen'> {}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [mode, setMode] = useState<LoginMode>('phone');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const isPhone = mode === 'phone';
  const isEmail = mode === 'email';
  const selectedBg = '#FFDDE3';
  const selectedText = '#FF2D55';
  const unselectedBg = '#F9F9F9';
  const unselectedText = '#A0A0A0';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={10}
          style={styles.backArrow}
        >
          <BackArrow />
        </TouchableOpacity>
        <StatusBar barStyle="dark-content" />

        <View style={styles.logoContainer}>
          <Welcomescreenlogo width={120} height={120} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>
            Welcome back you’ve been missed
          </Text>

          <View style={styles.topButton}>
            <AppButton
              title="Phone"
              variant="filled"
              color={isPhone ? selectedBg : unselectedBg}
              textStyle={{
                color: isPhone ? selectedText : unselectedText,
                fontWeight: '600',
              }}
              onPress={() => setMode('phone')}
              style={styles.topBtn}
            />

            <AppButton
              title="Email"
              variant="filled"
              color={isEmail ? selectedBg : unselectedBg}
              textStyle={{
                color: isEmail ? selectedText : unselectedText,
                fontWeight: '600',
              }}
              onPress={() => setMode('email')}
              style={styles.topBtn}
            />
          </View>

          {isEmail ? (
            <View style={styles.field}>
              <CustomTextField
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                LeftIcon={envelope}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                }}
              />
            </View>
          ) : (
            <View style={styles.field}>
              <CustomTextField
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                LeftIcon={phoneLogo}
                inputProps={{
                  keyboardType: 'phone-pad',
                }}
              />
            </View>
          )}

          {/* <View style={styles.field}>
            <CustomTextField
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              LeftIcon={envelope}
              inputProps={{
                secureTextEntry: true,
                autoCapitalize: "none",
              }}
            />
          </View> */}

          <View style={styles.button}>
            <AppButton
              title="Sign In"
              onPress={() => console.log('Sign In Pressed')}
            />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backArrow: {
    marginTop: 16,
    marginLeft: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  topButton: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  topBtn: {
    flex: 1,
  },
  field: {
    marginTop: 16,
  },
  button: {
    marginTop: 24,
  },
  signupContainer: {
    marginTop: 'auto',
    marginBottom: 32,
    alignItems: 'center',
  },

  signupText: {
    fontSize: 14,
    color: '#666',
  },

  signupLink: {
    color: '#FF2D55',
    fontWeight: '600',
  },
});
