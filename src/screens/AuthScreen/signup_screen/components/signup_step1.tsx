import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
import { FullName, User } from '../../../../AppConstant/Icons';
import {styles} from "../components/signup_step1_style"

type StepOneProps = {
  fullName: string;
  userName: string;
  setFullName: (v: string) => void;
  setUserName: (v: string) => void;
};

const StepOne: React.FC<StepOneProps> = ({
  fullName,
  userName,
  setFullName,
  setUserName,
}) => {
  return (
    <>
      <View style={styles.fieldWrapper}>
        <CustomTextField
          placeholder="Full Name"
          LeftIcon={FullName}
          inputProps={{ autoCapitalize: 'words' }}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.fieldWrapper}>
        <CustomTextField
          placeholder="Username"
          LeftIcon={User}
          inputProps={{ autoCapitalize: 'none' }}
          value={userName}
          onChangeText={setUserName}
        />
      </View>
    </>
  );
};

export default StepOne;


