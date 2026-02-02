import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import CustomTextField from '../../../../Component/GlobalComponent/CustomTextField';
import { DownArrow, Location } from '../../../../AppConstant/Icons';
import { styles } from '../components/singup_step2_styles';

import { useListingApi } from '../../../../hooks/useListingApi';
import { apiEndpoints } from '../../../../utils/endpoints';
type City = {
  CityID: number;
  CityName: string;
  CityNameEn: string | null;
  CityNameAr: string | null;
  Status: number;
};

type StepTwoProps = {
  values: { selectedCity: string };
  errors: { selectedCity?: string };
  touched: { selectedCity?: boolean };
  setFieldValue: (field: 'selectedCity', value: string) => void;
  setFieldTouched: (field: 'selectedCity', touched?: boolean) => void;
};

const StepTwo: React.FC<StepTwoProps> = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const listingConfig = useMemo(
    () => ({
      pageIndex: 1,
      pageSize: 9999,
      transformData: (data: any) => {
        const cities: City[] = data?.Data?.cities ?? [];
        return { data: cities, totalCount: cities.length };
      },
      idExtractor: (c: City) => c.CityID,
    }),
    [],
  );

  const { data: cities = [], loading } = useListingApi<City>(
    apiEndpoints.GET_CITY_LISTING,
    null,
    listingConfig,
  );

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter(c => (c.CityName || '').toLowerCase().includes(q));
  }, [cities, search]);

  const selectedCityLabel = useMemo(() => {
    const id = values.selectedCity;
    const found = cities.find(c => String(c.CityID) === String(id));
    return found?.CityName ?? '';
  }, [values.selectedCity, cities]);

  const handleSelect = (city: City) => {
    setFieldValue('selectedCity', String(city.CityID));
    setFieldTouched('selectedCity', true);
    setSearch('');
    setOpen(false);
  };

  const showError = Boolean(touched.selectedCity && errors.selectedCity);

  return (
    <View style={{ marginTop: 18 }}>
      <TouchableOpacity
        style={[
          styles.dropdownWrapper,
          showError ? { borderColor: '#FF3B30', borderWidth: 1 } : null,
        ]}
        onPress={() => {
          setOpen(true);
          setFieldTouched('selectedCity', true);
        }}
      >
        <View style={styles.leftContent}>
          <Location />
          <Text
            numberOfLines={1}
            style={[
              styles.selectedText,
              selectedCityLabel ? { color: '#111' } : { color: '#A0A0A0' },
            ]}
          >
            {selectedCityLabel || (loading ? 'Loading...' : 'City')}
          </Text>
        </View>

        <DownArrow />
      </TouchableOpacity>

      {showError ? (
        <Text
          style={{
            marginTop: 6,
            marginLeft: 6,
            fontSize: 12,
            color: '#FF3B30',
          }}
        >
          {errors.selectedCity}
        </Text>
      ) : null}

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
            <CustomTextField
              placeholder={loading ? 'Loading cities...' : 'Search city'}
              value={search}
              onChangeText={setSearch}
              inputProps={{
                autoCapitalize: 'words',
                keyboardType: 'default',
              }}
            />

            <FlatList
              data={filteredCities}
              keyExtractor={item => String(item.CityID)}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {loading ? 'Loading...' : 'No city found'}
                </Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemWrapper}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item.CityName}</Text>
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
