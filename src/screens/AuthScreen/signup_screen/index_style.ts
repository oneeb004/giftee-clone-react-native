import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.04, 
  },

  backArrow: {
    marginTop: height * 0.015, 
    width: width * 0.1,       
    height: width * 0.1,       
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.008,  
    marginBottom: height * 0.015, 
  },

  mainHeadingText: {
    fontSize: width * 0.05,     
    fontWeight: '600',
    color: '#111111',
    marginTop: height * 0.01,   
  },

  headTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.01,  
  },

  headingText: {
    fontSize: width * 0.032,    
    fontWeight: '500',
    color: '#444444',
  },

  stepText: {
    fontSize: width * 0.03,     
    color: '#B0B0B0',
  },

  progressTrack: {
    height: height * 0.008,     
    borderRadius: 999,
    backgroundColor: '#E9E9E9',
    marginTop: height * 0.012,  
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FF2D55',
    borderRadius: 999,
  },

  bottomButton: {
    marginTop: height * 0.03,  
  },
});
