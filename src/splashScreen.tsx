import React from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function SplashScreen() {
return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.logoText}>Giftee</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FF2D55",
    },
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },
    logoText: {
    width: 146.0001,
    opacity: 1,
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    },
});

export default SplashScreen;