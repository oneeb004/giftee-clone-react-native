import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
} from "react-native";

type CustomTextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;

  LeftIcon?: React.ComponentType<{ width?: number; height?: number }>;

  containerStyle?: ViewStyle;
  inputProps?: TextInputProps;
};

export default function CustomTextField({
  value,
  onChangeText,
  placeholder = "",
  LeftIcon,
  containerStyle,
  inputProps,
}: CustomTextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
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
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    borderRadius: 12,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconBox: {
    marginRight: 10,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    paddingVertical: 0, 
  },
});
