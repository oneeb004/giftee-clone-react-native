import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

type CustomTextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  LeftIcon?: React.ComponentType<{ width?: number; height?: number }>;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputProps?: TextInputProps;
  error?: string;
};

export default function CustomTextField({
  value,
  onChangeText,
  placeholder = '',
  LeftIcon,
  containerStyle,
  inputStyle,
  inputProps,
  error,
}: CustomTextFieldProps) {
  const hasError = Boolean(error?.trim());

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          containerStyle,
          hasError && styles.containerError,
        ]}
      >
        {LeftIcon ? (
          <View style={styles.iconBox}>
            <LeftIcon width={18} height={18} />
          </View>
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B8B8B8"
          style={[styles.input, inputStyle]}
          {...inputProps}
        />
      </View>

      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  container: {
    height: 54,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,

    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,

    // ✅ default border (invisible)
    borderWidth: 1,
    borderColor: 'transparent',
  },

  containerError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },

  iconBox: {
    marginRight: 10,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    paddingVertical: 0,
  },

  errorText: {
    marginTop: 6,
    marginLeft: 6,
    fontSize: 12,
    color: '#FF3B30',
  },
});
