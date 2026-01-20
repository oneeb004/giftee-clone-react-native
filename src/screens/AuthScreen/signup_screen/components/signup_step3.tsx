import React, { useMemo, useState, useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
const { width, height } = Dimensions.get('window');
type StepThreeProps = {
  phoneRaw: string;
  email: string;
  setPhoneRaw: (val: string) => void;
  setEmail: (val: string) => void;

  countryCode: CountryCode;
  setCountryCode: (val: CountryCode) => void;

  callingCode: string;
  setCallingCode: (val: string) => void;

  setIsPhoneValid?: (val: boolean) => void;
  setE164?: (val: string) => void;
};

const StepThree: React.FC<StepThreeProps> = ({
  phoneRaw,
  email,
  setEmail,
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
      <View >
        <Text>Enter your Email Address</Text>
      </View>

      <View style={styles.emailContainer}>
        <CustomTextField
          placeholder="Enter Your Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          inputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
        />
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
    fontSize: width * 0.05,       
    fontWeight: '600',
    color: '#111111',
    marginBottom: height * 0.008,  
  },

  subTitle: {
    fontSize: width * 0.032,      
    color: '#444444',
    marginBottom: height * 0.015,  
  },

  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: width * 0.03,    
    paddingHorizontal: width * 0.03,
    height: height * 0.065,        
  },

  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,            
    paddingRight: width * 0.025,  
  },

  callingCodeText: {
    fontSize: width * 0.035,      
    fontWeight: '500',
  },

  chevron: {
    fontSize: width * 0.035,       
    color: '#999',
    marginLeft: width * 0.005,    
  },

  divider: {
    width: 1,
    height: height * 0.03,         
    backgroundColor: '#E2E2E2',
    marginHorizontal: width * 0.025,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  emailTextWrap: {
    marginTop: height * 0.025,    
  },

  emailLabel: {
    fontSize: width * 0.035,       
    color: '#111',
  },



  emailContainer: {
    justifyContent: 'center',
    marginTop: height * 0.02,     
  },

  helperWrap: {
    marginTop: height * 0.012,     
  },

  helperText: {
    fontSize: width * 0.03,       
    color: '#888',
  },

  errorText: {
    color: '#D11A2A',
  },

  successText: {
    color: '#1B8F3A',
  },
});
