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
  color?: string; 
};

const DEFAULT_COLOR = "#FF2D55";

export default function AppButton({
  title,
  onPress,
  variant = "filled",
  disabled = false,
  loading = false,
  style,
  textStyle,
  color = DEFAULT_COLOR,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "filled"
          ? { backgroundColor: color }
          : {
              backgroundColor: "white",
              borderWidth: 1.5,
              borderColor: color,
            },
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "filled" ? "white" : color} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: variant === "filled" ? "white" : color },
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
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
