import React, { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { CountryCode } from 'react-native-country-picker-modal';
import BottomSheet from '@gorhom/bottom-sheet';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { BackArrow, Welcomescreenlogo } from '../../../AppConstant/Icons';
import { AuthStackScreen } from '../../../navigator/navigation.type';
import StepOne from './components/signup_step1';
import StepTwo from './components/signup_step2';
import StepThree from './components/signup_step3';
import PhoneConfirmBottomSheet from '../otp_verfication_screen/phone_confrim_bottom_sheet';
import { styles } from './index_style';
import api from '../../../utils/api';
import { apiEndpoints } from '../../../utils/endpoints';

interface SignUpScreenProps extends AuthStackScreen<'SignUpScreen'> {}

type SignUpValues = {
  fullName: string;
  userName: string;
  selectedCity: string;
  phoneRaw: string;
  countryCode: CountryCode;
  callingCode: string;
  phoneE164: string;
  email: string;


};

const TOTAL_STEPS = 3;

const Step1Schema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  userName: Yup.string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9._]+$/,
      'Only letters, numbers, dot, underscore allowed',
    )
    .required('Username is required'),
});

const Step2Schema = Yup.object().shape({
  selectedCity: Yup.string().trim().required('City is required'),
});

const Step3Schema = Yup.object().shape({
  phoneE164: Yup.string()
    .trim()
    .matches(/^\+\d{8,15}$/, 'Enter a valid phone number')
    .required('Phone number is required'),

  email: Yup.string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
});


const getSchemaForStep = (step: number) => {
  switch (step) {
    case 1:
      return Step1Schema;
    case 2:
      return Step2Schema;
    case 3:
      return Step3Schema;
    default:
      return Step1Schema;
  }
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const progress = currentStep / TOTAL_STEPS;
  const sheetRef = useRef<BottomSheet | null>(null);

  const openSheet = () => {
    const s = sheetRef.current as any;
    if (!s) return;
    if (typeof s.expand === 'function') return s.expand();
    if (typeof s.snapToIndex === 'function') return s.snapToIndex(0);
  };

  const closeSheet = () => {
    const s = sheetRef.current as any;
    if (!s) return;
    if (typeof s.close === 'function') return s.close();
    if (typeof s.snapToIndex === 'function') return s.snapToIndex(-1);
    if (typeof s.collapse === 'function') return s.collapse();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else navigation.goBack();
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

  const verifyUsernameOnNext = async (
    values: SignUpValues,
    setFieldError: FormikProps<SignUpValues>['setFieldError'],
  ) => {
    const username = values.userName.trim().toLowerCase();

    setFieldError('userName', undefined);

    console.log('[VERIFY USERNAME] Checking:', username);

    const res = await api.post<any>(apiEndpoints.VERIFY_USERNAME, username);

    console.log('[VERIFY USERNAME] Response:', res);

    if (res.failed || !res.success) {
      const errorMsg = res.error || 'This username already exists';
      console.log('[VERIFY USERNAME] Not available:', errorMsg);
      setFieldError('userName', errorMsg);
      return false;
    }

    console.log('[VERIFY USERNAME] Available ✓');
    return true;
  };

  const registerUserAndSendOtp = async (
  values: SignUpValues,
  setFieldError: FormikProps<SignUpValues>['setFieldError'],
) => {
  const payload = {
    FullName: values.fullName.trim(),
    UserName: values.userName.trim().toLowerCase(),
    CityId: values.selectedCity,
    Phone: values.phoneRaw.replace(/\D/g, ''), 
    Email: values.email.trim(),
  };

  console.log('[SIGNUP] endpoint:', apiEndpoints.REGISTER_AND_SEND_OTP);
  console.log('[SIGNUP] payload:', payload);

  const res = await api.post<any>(apiEndpoints.REGISTER_AND_SEND_OTP, payload);

  console.log('[SIGNUP] response:', res);

  if (res.failed || !res.success) {
    const msg = res.error || 'Signup failed';
    setFieldError('userName', msg);
    return { ok: false, error: msg };
  }

  return { ok: true };
};


  const onNextPress = async (formik: FormikProps<SignUpValues>) => {
    Keyboard.dismiss();

    const { values, validateForm, setTouched, setFieldTouched, setFieldError } =
      formik;

    if (currentStep === 1) setTouched({ fullName: true, userName: true });
    if (currentStep === 2) setTouched({ selectedCity: true });
    if (currentStep === 3) setTouched({ phoneE164: true });

    const formErrors = await validateForm();

    const hasStepErrors =
      (currentStep === 1 && (formErrors.fullName || formErrors.userName)) ||
      (currentStep === 2 && formErrors.selectedCity) ||
      (currentStep === 3 && formErrors.phoneE164);

    if (hasStepErrors) return;

    if (currentStep === 1) {
      const ok = await verifyUsernameOnNext(values, setFieldError);
      if (!ok) return;

      setCurrentStep(2);
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    if (!isPhoneValid) {
      setFieldTouched('phoneE164', true);
      return;
    }

    openSheet();
  };

  return (
    <BottomSheetModalProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <SafeAreaProvider style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <Formik<SignUpValues>
              initialValues={{
                fullName: '',
                userName: '',
                selectedCity: '',
                phoneRaw: '',
                countryCode: 'PK',
                callingCode: '92',
                phoneE164: '',
                 email: '', 
              }}
              validationSchema={getSchemaForStep(currentStep)}
              validateOnBlur={true}
              validateOnChange={false}
              onSubmit={() => {}}
            >
              {formik => {
                const {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                  setFieldError,
                } = formik;

                const phoneText = useMemo(() => {
                  return values.phoneE164?.length
                    ? values.phoneE164
                    : `+${values.callingCode} ${values.phoneRaw}`;
                }, [values.phoneE164, values.callingCode, values.phoneRaw]);

                return (
                  <>
                    <Pressable onPress={handleBack} style={styles.backArrow}>
                      <BackArrow />
                    </Pressable>

                    <View style={styles.logoContainer}>
                      <Welcomescreenlogo width={120} height={120} />
                    </View>

                    <Text style={styles.mainHeadingText}>{getMainTitle()}</Text>

                    <View style={styles.headTextContainer}>
                      <Text style={styles.headingText}>
                        {getDiscriptionText()}
                      </Text>
                      <Text style={styles.stepText}>
                        Step {currentStep} of {TOTAL_STEPS}
                      </Text>
                    </View>

                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${progress * 100}%` },
                        ]}
                      />
                    </View>

                    <View style={{ marginTop: 18 }}>
                      {currentStep === 1 && (
                        <StepOne
                          values={{
                            fullName: values.fullName,
                            userName: values.userName,
                          }}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange as any}
                          handleBlur={handleBlur as any}
                          setFieldError={(field, msg) =>
                            setFieldError(field, msg)
                          }
                          setFieldTouched={(field, t = true) =>
                            setFieldTouched(field, t)
                          }
                        />
                      )}

                      {currentStep === 2 && (
                        <StepTwo
                          values={{ selectedCity: values.selectedCity }}
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue as any}
                          setFieldTouched={setFieldTouched as any}
                        />
                      )}

                      {currentStep === 3 && (
                        <StepThree
                          phoneRaw={values.phoneRaw}
                          setPhoneRaw={v => setFieldValue('phoneRaw', v)}
                          countryCode={values.countryCode}
                          setCountryCode={v => setFieldValue('countryCode', v)}
                          callingCode={values.callingCode}
                          setCallingCode={v => setFieldValue('callingCode', v)}
                          setIsPhoneValid={setIsPhoneValid}
                          setE164={v => setFieldValue('phoneE164', v)}
                            email={values.email}                    
    setEmail={v => setFieldValue('email', v)} 
                        />
                      )}
                    </View>

                    <View style={styles.bottomButton}>
                      <AppButton
                        title={currentStep === TOTAL_STEPS ? 'SignUp' : 'Next'}
                        onPress={() => onNextPress(formik)} // ✅ call external handler
                        disabled={currentStep === 3 ? !isPhoneValid : false}
                      />
                    </View>

                    <PhoneConfirmBottomSheet
  ref={sheetRef}
  phoneText={phoneText}
  onConfirm={async () => {
    closeSheet();

    const result = await registerUserAndSendOtp(values, setFieldError);
    if (!result.ok) return;

    navigation.navigate('OtpVerificationScreen', {
      email: values.email.trim(),
      phoneNo: values.phoneRaw.replace(/\D/g, ''), // ✅ without country code
      flow: 'signup',
    });
  }}
  onChange={() => closeSheet()}
/>


                   
                  </>
                );
              }}
            </Formik>
          </SafeAreaProvider>
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModalProvider>
  );
};

export default SignUpScreen;
