import React, { forwardRef, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import AppButton from '../../../Component/GlobalComponent/PrimaryButton';
import { picture } from '../../../AppConstant/Images';

type Props = {
  phoneText: string;
  onConfirm: () => void;
  onChange: () => void;
};

const PhoneConfirmBottomSheet = forwardRef<BottomSheet, Props>(
  ({ phoneText, onConfirm, onChange }, ref) => {
    const snapPoints = useMemo(() => ['40%'], []);

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        animateOnMount={false}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#FF2D55', width: 40 }}
      >
        <View style={styles.sheetContent}>
          <View style={styles.topContent}>
            <Image style={styles.sheetIcon} source={picture} />
            <Text style={styles.sheetTitle}>
              Is this your correct phone number?
            </Text>
            <Text style={styles.sheetNumber}>{phoneText}</Text>
          </View>

          <View style={styles.bottomButtons}>
            <AppButton title="Yes, send code by SMS" onPress={onConfirm} />
            <Pressable style={styles.secondaryBtn} onPress={onChange}>
              <Text style={styles.secondaryBtnText}>No, I want to change it</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    );
  },
);

export default PhoneConfirmBottomSheet;

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between', 
  },

  topContent: {
    alignItems: 'center',
  },

  sheetIcon: {
    alignSelf: 'center',
    height: 48,
    width: 48,
    borderRadius: 10,
    marginBottom: 10,
  },

  sheetTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#111',
    fontWeight: '500',
    marginTop: 6,
  },

  sheetNumber: {
    textAlign: 'center',
    fontSize: 22,
    color: '#FF2D55',
    fontWeight: '600',
    marginTop: 6,
  },

  bottomButtons: {
    marginBottom: 30,

  },

  secondaryBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FF2D55',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  secondaryBtnText: {
    color: '#FF2D55',
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
