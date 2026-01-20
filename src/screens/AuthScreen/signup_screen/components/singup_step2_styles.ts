import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  label: {
    fontSize: width * 0.035,      
    fontWeight: '500',
    marginBottom: height * 0.01,   
    color: '#444444',
  },

  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.025,            
    borderRadius: width * 0.03,    
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03, 
    paddingVertical: height * 0.015,  
  },

  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.025,            
  },

  selectedText: {
    fontSize: width * 0.035,       
    flexShrink: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: width * 0.9,            
    maxHeight: height * 0.7,       
    backgroundColor: '#fff',
    borderRadius: width * 0.03,    
    paddingVertical: height * 0.01, 
  },

  searchInput: {
    height: height * 0.055,        
    marginHorizontal: width * 0.03, 
    marginBottom: height * 0.01,    
    paddingHorizontal: width * 0.03, 
    borderRadius: width * 0.02,   
    backgroundColor: '#F2F2F2',
    fontSize: width * 0.035,      
    color: '#111',
  },

  itemWrapper: {
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.04, 
  },

  itemText: {
    fontSize: width * 0.035,       
    color: '#111',
  },

  emptyText: {
    textAlign: 'center',
    paddingVertical: height * 0.025, 
    color: 'white',
    fontSize: width * 0.035,      
  },
});
