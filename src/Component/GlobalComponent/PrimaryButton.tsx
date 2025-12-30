import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

type AppButtonVariant = "filled" | "outline";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const PRIMARY = "#FF2D55";

export default function AppButton({
  title,
  onPress,
  variant = "filled",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "filled" ? styles.filled : styles.outline,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "filled" ? styles.textFilled : styles.textOutline,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filled: {
    backgroundColor: PRIMARY,
  },
  outline: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textFilled: {
    color: "white",
  },
  textOutline: {
    color: PRIMARY,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
