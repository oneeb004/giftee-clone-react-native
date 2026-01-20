import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Welcomescreenlogo } from '../../../AppConstant/Icons';
import {styles} from '../otp_verfication_screen/otp_verification_style';

type Props = {
  navigation: any;
};

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 60;

const OtpVerificationScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const isComplete = useMemo(() => {
    return otp.every(digit => digit !== '');
  }, [otp]);

  const otpValue = useMemo(() => otp.join(''), [otp]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  useEffect(() => {
    if (error && otp.some(digit => digit !== '')) {
      setError('');
    }
  }, [otp, error]);

  const mmss = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }, [secondsLeft]);

  const focusIndex = (i: number) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const onChangeAt = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, OTP_LENGTH).split('');
      const next = Array(OTP_LENGTH).fill('');
      for (let i = 0; i < OTP_LENGTH; i++) next[i] = chars[i] ?? '';
      setOtp(next);

      const nextFocus = Math.min(chars.length, OTP_LENGTH - 1);
      setTimeout(() => focusIndex(nextFocus), 10);
      return;
    }

    const next = [...otp];
    next[index] = cleaned;
    setOtp(next);

    if (cleaned && index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const onKeyPressAt = (index: number, key: string) => {
    if (key !== 'Backspace') return;

    if (!otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = '';
      setOtp(next);  
      focusIndex(index - 1);
      return;
    }
    if (otp[index]) {
      const next = [...otp];
      next[index] = '';
      setOtp(next);
    }
  };

  const onVerify = async () => {
    if (!isComplete || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      console.log('Verifying OTP:', otpValue);
      setIsSubmitting(false);
    } catch (e: any) {
      setIsSubmitting(false);
      setError(e?.message || 'Invalid OTP. Please try again.');
    }
  };

  const onResend = async () => {
    if (secondsLeft > 0) return;

    try {
      console.log('Resending OTP...');

      setOtp(Array(OTP_LENGTH).fill(''));
      setError('');
      setSecondsLeft(INITIAL_SECONDS);
      setTimeout(() => focusIndex(0), 50);
    } catch (e: any) {
      setError(e?.message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrap}>
          <Welcomescreenlogo />
        </View>
        <Text style={styles.heading}>
          Enter the 6-digit code which is sent{'\n'}to your email and phone
          number
        </Text>
        <View style={styles.otpRow}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <TextInput
              key={i}
              ref={r => {
                inputsRef.current[i] = r;
              }}
              value={otp[i]}
              onChangeText={t => onChangeAt(i, t)}
              onKeyPress={({ nativeEvent }) => onKeyPressAt(i, nativeEvent.key)}
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={1}
              style={[
                styles.otpBox,
                otp[i] && styles.otpBoxFilled,
                error && styles.otpBoxError,
              ]}
              placeholder=""
              placeholderTextColor="#bbb"
              textAlign="center"
              autoFocus={i === 0}
              editable={!isSubmitting}
            />
          ))}
        </View>
        (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        ) (
        <View style={styles.timerRow}>
          <Text style={styles.timerText}>
            Haven't received code yet? Wait for{' '}
            <Text style={styles.timerRed}>{mmss}</Text>
          </Text>
        </View>
        )
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onVerify}
          disabled={!isComplete || isSubmitting}
          style={[
            styles.verifyBtn,
            (!isComplete || isSubmitting) && styles.verifyBtnDisabled,
          ]}
        >
          <Text style={styles.verifyText}>
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>
        {secondsLeft <= 0 && (
          <TouchableOpacity onPress={onResend} style={styles.resendBtn}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;
