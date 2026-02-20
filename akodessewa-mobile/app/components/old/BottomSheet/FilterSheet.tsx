import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Button from '../Button/Button';
import { ScrollView } from 'react-native-gesture-handler';


const FilterSheet = (props, ref) => {

  // ref
  const bottomSheetRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ['70%'], []);


  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);



  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
  );



  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    openSheet: () => { openSheet() }
  }))
  // internal method
  const openSheet = () => {
    bottomSheetRef.current.snapToIndex(0)
  }

  const theme = useTheme();
  const { colors } = theme;

  const navigation = useNavigation();

  const handleClosePress = () => {
    bottomSheetRef.current.close()
  }

  const brandData = ["Good Vibes", "Maybelline", "NY Bae", "Lakme","Vibes"];

  const [activeSize, setActiveSize] = useState(brandData[0]);

  const categoriesData = ["Trees", "Shrubs", "Herbs", "Vines", "Ferns"];

  const [active1Size, setActive1Size] = useState(categoriesData[0]);

  const sizeData = ["S", "M", "L", "XL", "2Xl"];

  const [active2Size, setActive2Size] = useState(sizeData[0]);

  const [multiSliderValue, setMultiSliderValue] = useState([200, 270])

  const multiSliderValuesChange = (values) => setMultiSliderValue(values)

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleStyle={{ top: 0 }}
      handleIndicatorStyle={{ backgroundColor: theme.dark ? 'rgba(255,255,255,0.30)' : 'rgba(0, 0, 0, 0.30)', width: 92 }}
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <View style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingBottom: 15,
            marginHorizontal: -15,
            paddingHorizontal: 15
          }}
        >
          <Text style={[FONTS.fontMedium, { color: colors.title, fontSize: 20 }]}>Filters</Text>
          <TouchableOpacity
            style={{ height: 38, width: 38, backgroundColor: colors.card, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => handleClosePress()}
          >
            <Image
              style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: colors.title }}
              source={IMAGES.close}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Brand</Text>
              <TouchableOpacity>
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 5 }}>
              {brandData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveSize(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.card,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, activeSize === data && {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, activeSize === data && {  color: COLORS.white }]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Categories:</Text>
              <TouchableOpacity>
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {categoriesData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActive1Size(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.card,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, active1Size === data && {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontRegular, fontSize: 16, color: colors.title }, active1Size === data && {  color: COLORS.white }]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Size:</Text>
              <TouchableOpacity>
                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {sizeData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActive2Size(data)}
                    key={index}
                    style={[{
                      backgroundColor: colors.card,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      marginBottom: 5
                    }, active2Size === data && {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    }]}
                  >
                    <Text style={[{ ...FONTS.fontRegular, fontSize: 16, color: colors.title }, active2Size === data && { color: COLORS.white }]}>{data}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Price:</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: colors.title, borderRadius: 20, backgroundColor: colors.card, textAlign: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>${multiSliderValue[0]} </Text>
                <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: colors.title, borderRadius: 20, backgroundColor: colors.card, textAlign: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>${multiSliderValue[1]}</Text>
              </View>
              <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                sliderLength={320}
                selectedStyle={{ backgroundColor: COLORS.primary, }}
                containerStyle={{ alignSelf: 'center', marginTop: -10 }}
                onValuesChange={multiSliderValuesChange}
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height: 24,
                      width: 24,
                      borderRadius: 50,
                      backgroundColor:colors.background,
                      borderWidth: 2,
                      borderColor: COLORS.primary
                    }
                  })
                }}
                min={200}
                max={270}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
              />

            </View>
            <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10, marginTop: 20,marginBottom:50 }}>
              <View style={{ width: '50%' }}>
                <Button
                  title={"Reset"}
                  text={colors.title}
                  color={colors.card}
                  btnRounded
                />
              </View>
              <View style={{ width: '50%' }}>
                <Button
                  title={"Apply"}
                  text={COLORS.card}
                  color={COLORS.primary}
                  btnRounded
                />
              </View>
            </View>
        </ScrollView>
      </View>
    </BottomSheet >
  );
};

export default forwardRef(FilterSheet);
