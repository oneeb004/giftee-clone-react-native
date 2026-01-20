import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";


const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backArrow: {
    marginTop: height * 0.01,
    marginLeft: width * 0.04,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
  },

  container: {
    paddingHorizontal: width * 0.05,
    flex: 1,
  },

  title: {
    fontSize: width * 0.06,
    fontWeight: '700',
    marginBottom: height * 0.01,
  },

  description: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.03,
  },

  topButton: {
    flexDirection: 'row',
    gap: width * 0.03,
    marginBottom: height * 0.03,
  },

  topBtn: {
    flex: 1,
  },

  field: {
    marginTop: height * 0.02,
  },

  button: {
    marginTop: height * 0.03,
  },

  signupContainer: {
    marginTop: 'auto',
    marginBottom: height * 0.04,
    alignItems: 'center',
  },

  signupText: {
    fontSize: width * 0.035,
    color: '#666',
  },

  signupLink: {
    color: '#FF2D55',
    fontWeight: '600',
  },
});