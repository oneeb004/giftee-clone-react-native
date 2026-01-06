import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
import { DownArrow, Location } from '../../../../AppConstant/Icons';

const cities = [
  'Karachi',
  'Lahore',
  'Faisalabad',
  'Rawalpindi',
  'Islamabad',
  'Multan',
  'Gujranwala',
  'Hyderabad',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Rahim Yar Khan',
  'Jhang',
  'Dera Ghazi Khan',
  'Gujrat',
  'Kasur',
  'Mardan',
  'Mingora',
  'Nawabshah',
  'Okara',
  'Mirpur Khas',
  'Chiniot',
  'Kamoke',
  'Burewala',
  'Jacobabad',
  'Sadiqabad',
  'Khanewal',
  'Hafizabad',
  'Kohat',
  'Muzaffargarh',
  'Khanpur',
  'Gojra',
  'Bahawalnagar',
  'Muridke',
  'Pakpattan',
  'Abbottabad',
  'Tando Adam',
  'Jaranwala',
  'Vihari',
  'Jhelum',
  'Attock',
  'Swabi',
  'Nowshera',
  'Khuzdar',
];

type StepTwoProps = {
  selectedCity: string;
  setSelectedCity: (v: string) => void;
};

const StepTwo: React.FC<StepTwoProps> = ({ selectedCity, setSelectedCity }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setSearch('');
    setOpen(false);
  };

  return (
    <View style={{ marginTop: 18 }}>
      <TouchableOpacity
        style={styles.dropdownWrapper}
        onPress={() => setOpen(true)}
      >
        <View style={styles.leftContent}>
          <Location />
          <Text
            numberOfLines={1}
            style={[
              styles.selectedText,
              selectedCity ? { color: '#111' } : { color: '#A0A0A0' },
            ]}
          >
            {selectedCity || 'City'}
          </Text>
        </View>

        <DownArrow />
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setSearch('');
            setOpen(false);
          }}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalContent}>
              <CustomTextField
                placeholder="City"
                value={search}
                onChangeText={setSearch}
                inputProps={{
                  autoCapitalize: 'words',
                  keyboardType: 'default',
                }}
              />
            </View>

            {/* <TextInput
              placeholder="City"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholderTextColor="#999"
            /> */}

            <FlatList
              data={filteredCities}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={styles.emptyText}>No city found</Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemWrapper}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444444',
  },

  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  selectedText: {
    fontSize: 14,
    flexShrink: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    maxHeight: 500,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
  },

  searchInput: {
    height: 44,
    marginHorizontal: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    fontSize: 14,
    color: '#111',
  },

  itemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  itemText: {
    fontSize: 14,
    color: '#111',
  },

  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: 'white',
    fontSize: 14,
  },
});
