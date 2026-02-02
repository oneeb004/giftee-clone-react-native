import React from 'react';
import { View } from 'react-native';
import { styles } from '../components/signup_step1_style';

import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
import { FullName, User } from '../../../../AppConstant/Icons';

type StepOneProps = {
  values: {
    fullName: string;
    userName: string;
  };
  errors: {
    fullName?: string;
    userName?: string;
  };
  touched: {
    fullName?: boolean;
    userName?: boolean;
  };
  handleChange: (field: 'fullName' | 'userName') => (text: string) => void;
  handleBlur: (field: 'fullName' | 'userName') => () => void;
  setFieldError: (field: 'userName', message: string | undefined) => void;
  setFieldTouched: (field: 'userName', touched?: boolean) => void;
};

const StepOne: React.FC<StepOneProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldError,
  setFieldTouched,
}) => {
  return (
    <>
      <View style={styles.fieldWrapper}>
        <CustomTextField
          placeholder="Full Name"
          LeftIcon={FullName}
          value={values.fullName}
          onChangeText={handleChange('fullName')}
          inputProps={{
            autoCapitalize: 'words',
            onBlur: handleBlur('fullName'),
          }}
          error={touched.fullName ? errors.fullName : undefined}
        />
      </View>

      <View style={styles.fieldWrapper}>
        <CustomTextField
          placeholder="Username"
          LeftIcon={User}
          value={values.userName}
          onChangeText={txt => {
            setFieldError('userName', undefined);
            handleChange('userName')(txt);
          }}
          inputProps={{
            autoCapitalize: 'none',
            onBlur: () => {
              setFieldTouched('userName', true);
            },
          }}
          error={touched.userName ? errors.userName : undefined}
        />
      </View>
    </>
  );
};

export default StepOne;
