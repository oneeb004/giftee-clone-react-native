import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import { Welcomescreenlogo } from "../../AppConstant/Icons";
import { Text } from "react-native";

function SignInScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />

        {/* LOGO SECTION */}
        <View style={styles.logoContainer}>
          <Welcomescreenlogo width={120} height={120} />
        </View>
        
            <Text style={styles.text}>
                Sign In
            </Text>
        

        {/* CONTENT PLACEHOLDER (form will go here) */}
        <View style={styles.content}>
          {/* Sign In form fields */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 24,     
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 0,
  },
});
