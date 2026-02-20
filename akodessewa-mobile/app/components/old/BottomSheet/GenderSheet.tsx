import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Button from '../Button/Button';

const GenderSheet = (props, ref) => {


    // ref
    const bottomSheetRef = useRef(null);


    // variables
    const snapPoints = useMemo(() => ['20%'], []);


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

    const GenderData = ["Men", "Women",];

    const [activeSize, setActiveSize] = useState(GenderData[0]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            handleStyle={{ top: 0 }}
            handleIndicatorStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.30)', width: 92 }}
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
                    <Text style={[FONTS.Marcellus, { color: colors.title, fontSize: 20 }]}>Gender</Text>
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 20 }}>
                    {GenderData.map((data, index) => {
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
                                <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, activeSize === data && { color: COLORS.white }]}>{data}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </BottomSheet >
    )
}

export default forwardRef(GenderSheet);