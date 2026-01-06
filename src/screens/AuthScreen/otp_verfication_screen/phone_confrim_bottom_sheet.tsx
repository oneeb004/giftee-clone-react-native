import React, { forwardRef, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import AppButton from '../../../Component/GlobalComponent/PrimaryButton';

type Props = {
  phoneText: string; // formatted number you want to show
  onConfirm: () => void;
  onChange: () => void;
};

const PhoneConfirmBottomSheet = forwardRef<BottomSheet, Props>(
  ({ phoneText, onConfirm, onChange }, ref) => {
    const snapPoints = useMemo(() => ['42%'], []);

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
        handleIndicatorStyle={{ backgroundColor: '#CFCFCF', width: 40 }}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetIcon} />

          <Text style={styles.sheetTitle}>
            Is this your correct phone number?
          </Text>

          <Text style={styles.sheetNumber}>{phoneText}</Text>

          <View style={{ marginTop: 16 }}>
            <AppButton title="Yes, send code by SMS" onPress={onConfirm} />
          </View>

          <Pressable style={styles.secondaryBtn} onPress={onChange}>
            <Text style={styles.secondaryBtnText}>No, I want to change it</Text>
          </Pressable>
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
  },

  sheetIcon: {
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFE6EB',
    marginBottom: 10,
  },

  sheetTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
    marginTop: 6,
  },

  sheetNumber: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FF2D55',
    fontWeight: '600',
    marginTop: 6,
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
  },
});
