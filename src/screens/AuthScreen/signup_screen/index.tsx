import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { BackArrow } from '../../../AppConstant/Icons';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../../../Component/GlobalComponent/CustomTextField';
import { AuthStackScreen } from '../../../navigator/navigation.type';
interface SignUpScreenProps extends AuthStackScreen<'SignUpScreen'> {}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <Pressable onPress={() => navigation.goBack()}>
          <BackArrow />
        </Pressable>

        <Text>Let’s Start Name & Username</Text>
        <View style={styles.headTextContainer}>
          <Text style={styles.headingText}>Personal Information</Text>
          <Text>Step 1 of 3</Text>
        </View>
        <CustomTextField
          placeholder={'Full Name'}
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          value={''}
          onChangeText={() => {}}
        />

        <AppButton title={'Next'} onPress={() => {}}></AppButton>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headingText: {
    fontSize: 14,
  },
});
