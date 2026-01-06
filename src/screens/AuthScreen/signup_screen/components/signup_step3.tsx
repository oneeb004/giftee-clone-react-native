import React, { useMemo, useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
import { phoneLogo } from '../../../../AppConstant/Icons';

type StepThreeProps = {
  phoneRaw: string;
  setPhoneRaw: (val: string) => void;

  countryCode: CountryCode;
  setCountryCode: (val: CountryCode) => void;

  callingCode: string;
  setCallingCode: (val: string) => void;

  setIsPhoneValid?: (val: boolean) => void;
  setE164?: (val: string) => void;
};

const StepThree: React.FC<StepThreeProps> = ({
  phoneRaw,
  setPhoneRaw,
  countryCode,
  setCountryCode,
  callingCode,
  setCallingCode,
  setIsPhoneValid,
  setE164,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [hasSelectedCountry, setHasSelectedCountry] = useState(false);
  const phoneObj = useMemo(() => {
    const full = `+${callingCode}${phoneRaw.replace(/\D/g, '')}`;
    return parsePhoneNumberFromString(full);
  }, [callingCode, phoneRaw]);

  const isValid = useMemo(() => phoneObj?.isValid() ?? false, [phoneObj]);

  const formatted = useMemo(() => {
    if (!phoneObj) return '';
    try {
      return phoneObj.formatInternational();
    } catch {
      return '';
    }
  }, [phoneObj]);

  useEffect(() => {
    setIsPhoneValid?.(isValid);
    setE164?.(phoneObj?.number ?? '');
  }, [isValid, phoneObj, setIsPhoneValid, setE164]);

  const onSelectCountry = (c: Country) => {
    setCountryCode(c.cca2);
    const code = (c.callingCode?.[0] ?? '').toString();
    setCallingCode(code);
    setPickerVisible(false);
  };

  return (
    <View>
      <View style={styles.phoneCard}>
        <Pressable
          style={styles.countryButton}
          onPress={() => setPickerVisible(true)}
        >
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withFilter
            withEmoji
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}
            onSelect={onSelectCountry}
          />
          <Text style={styles.callingCodeText}>+{callingCode}</Text>
          <Text style={styles.chevron}>▾</Text>
        </Pressable>

        <View style={styles.inputContainer}>
          <CustomTextField
            placeholder="51 234 5678"
            value={phoneRaw}
            onChangeText={(text: string) => {
              setPhoneRaw(text.replace(/[^\d]/g, ''));
            }}
            inputProps={{
              keyboardType: 'phone-pad',
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        {!phoneRaw ? (
          <Text style={styles.helperText}></Text>
        ) : isValid ? (
          <Text style={[styles.helperText, styles.successText]}>
            Valid: {formatted}
          </Text>
        ) : (
          <Text style={[styles.helperText, styles.errorText]}>
            Invalid phone number
          </Text>
        )}
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: '#444444',
    marginBottom: 12,
  },

  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 54,
  },

  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 10,
  },

  callingCodeText: {
    fontSize: 14,
    fontWeight: '500',
  },

  chevron: {
    fontSize: 14,
    color: '#999',
    marginLeft: 2,
  },

  divider: {
    width: 1,
    height: 26,
    backgroundColor: '#E2E2E2',
    marginHorizontal: 10,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  helperText: {
    fontSize: 12,
    color: '#888',
  },

  errorText: {
    color: '#D11A2A',
  },

  successText: {
    color: '#1B8F3A',
  },
});
