import { Dimensions, StyleSheet, } from "react-native";


const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    height: height * 0.06, 
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
  },

  backBtn: {
    width: width * 0.09,
    height: width * 0.09,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backIcon: {
    fontSize: width * 0.075,
    color: '#111',
    marginTop: -2,
  },

  logoWrap: {
    marginTop: height * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    marginTop: height * 0.04,
    paddingHorizontal: width * 0.06,
    textAlign: 'center',
    fontSize: width * 0.04,
    lineHeight: width * 0.055,
    color: '#111',
    fontWeight: '400',
  },

  otpRow: {
    marginTop: height * 0.035,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  otpBox: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.03,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor: '#fff',
    fontSize: width * 0.045,
    color: '#111',
    fontWeight: '600',
    textAlign: 'center',
  },

  otpBoxFilled: {
    borderColor: '#FF2D55',
    backgroundColor: '#FFF5F7',
  },

  otpBoxError: {
    borderColor: '#FF2D55',
    backgroundColor: '#FDE7EA',
  },

  timerRow: {
    marginTop: height * 0.03,
    alignItems: 'center',
    minHeight: height * 0.025,
  },

  timerText: {
    fontSize: width * 0.035,
    color: '#666',
  },

  timerRed: {
    color: '#FF2D55',
    fontWeight: '500',
  },

  errorContainer: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.06,
    minHeight: height * 0.025,
  },

  errorText: {
    color: '#FF2D55',
    textAlign: 'center',
    fontSize: width * 0.035,
    fontWeight: '500',
  },

  verifyBtn: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.06,
    height: height * 0.065,
    borderRadius: width * 0.035,
    backgroundColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyBtnDisabled: {
    opacity: 0.6,
  },

  verifyText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },

  resendBtn: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },

  resendText: {
    color: '#FF2D55',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});
