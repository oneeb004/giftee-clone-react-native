import React, { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { CountryCode } from 'react-native-country-picker-modal';
import BottomSheet from '@gorhom/bottom-sheet';

import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { BackArrow, Welcomescreenlogo } from '../../../AppConstant/Icons';
import { AuthStackScreen } from '../../../navigator/navigation.type';
import StepOne from './components/signup_step1';
import StepTwo from './components/signup_step2';
import StepThree from './components/signup_step3';
import PhoneConfirmBottomSheet from '../otp_verfication_screen/phone_confrim_bottom_sheet';
import OtpVerificationScreen from '../otp_verfication_screen/otp_verification_Screen';

interface SignUpScreenProps extends AuthStackScreen<'SignUpScreen'> {}

const TOTAL_STEPS = 3;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [phoneRaw, setPhoneRaw] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('PK');
  const [callingCode, setCallingCode] = useState('92');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneE164, setPhoneE164] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const progress = currentStep / TOTAL_STEPS;
  const sheetRef = useRef<BottomSheet | null>(null);

  const phoneText = useMemo(() => {
    return phoneE164?.length ? phoneE164 : `+${callingCode} ${phoneRaw}`;
  }, [phoneE164, callingCode, phoneRaw]);

  const openSheet = () => {
    const s = sheetRef.current as any;
    if (!s) {
      console.log('No ref available');
      return;
    }
    console.log('Opening sheet with ref:', s);
    if (typeof s.expand === 'function') {
      s.expand();
      return;
    }
    if (typeof s.snapToIndex === 'function') {
      s.snapToIndex(0);
      return;
    }
  };

  const closeSheet = () => {
    const s = sheetRef.current as any;
    if (!s) {
      console.log('No ref available');
      return;
    }

    console.log('Closing sheet with ref:', s);

    if (typeof s.close === 'function') {
      s.close();
      return;
    }

    if (typeof s.snapToIndex === 'function') {
      s.snapToIndex(-1);
      return;
    }

    if (typeof s.collapse === 'function') {
      s.collapse();
      return;
    }
  };

  const handleNext = () => {
    Keyboard.dismiss();

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    if (!isPhoneValid) return;
    openSheet();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const getMainTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Let’s Start Name & Username';
      case 2:
        return 'Select your city';
      case 3:
        return 'Phone Number';
      default:
        return '';
    }
  };

  const getDiscriptionText = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'City';
      case 3:
        return 'Personal Information';
      default:
        return '';
    }
  };

  return (
    <BottomSheetModalProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <SafeAreaProvider style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <Pressable onPress={handleBack} style={styles.backArrow}>
              <BackArrow />
            </Pressable>

            <View style={styles.logoContainer}>
              <Welcomescreenlogo width={120} height={120} />
            </View>

            <Text style={styles.mainHeadingText}>{getMainTitle()}</Text>

            <View style={styles.headTextContainer}>
              <Text style={styles.headingText}>{getDiscriptionText()}</Text>
              <Text style={styles.stepText}>
                Step {currentStep} of {TOTAL_STEPS}
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>

            <View style={{ marginTop: 18 }}>
              {currentStep === 1 && (
                <StepOne
                  fullName={fullName}
                  userName={userName}
                  setFullName={setFullName}
                  setUserName={setUserName}
                />
              )}

              {currentStep === 2 && (
                <StepTwo
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              )}

              {currentStep === 3 && (
                <StepThree
                  phoneRaw={phoneRaw}
                  setPhoneRaw={setPhoneRaw}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  callingCode={callingCode}
                  setCallingCode={setCallingCode}
                  setIsPhoneValid={setIsPhoneValid}
                  setE164={setPhoneE164} email={''} setEmail={function (val: string): void {
                 
                  } }                />
              )}
            </View>

            <View style={styles.bottomButton}>
              <AppButton
                title={currentStep === TOTAL_STEPS ? 'SignUp' : 'Next'}
                onPress={handleNext}
                disabled={currentStep === 3 ? !isPhoneValid : false}
              />
            </View>
          </SafeAreaProvider>

          <PhoneConfirmBottomSheet
            ref={sheetRef}
            phoneText={phoneText}
            onConfirm={() => {
              closeSheet();
              navigation.navigate('OtpVerificationScreen');
            }}
            onChange={() => {
              closeSheet();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModalProvider>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },

  backArrow: {
    marginTop: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },

  mainHeadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    marginTop: 8,
  },

  headTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  headingText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444444',
  },

  stepText: {
    fontSize: 12,
    color: '#B0B0B0',
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E9E9E9',
    marginTop: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FF2D55',
    borderRadius: 999,
  },

  bottomButton: {
    marginTop: 24,
  },
});
