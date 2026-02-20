import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,ScrollView,TouchableOpacity, LayoutAnimation, Image } from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeBox from '../../components/SwipeBox';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const PopoulerData = [
    {
        title: "All",
        active:true
    },
    {
        title: "Offer",
        image:IMAGES.offer
    },
    {
        title: "Crazy Deals",
        image:IMAGES.fire,
    },
    {
        title: "Deal of the day",
    },
]

const Swipe4Data = [
    {
        image: IMAGES.brand3,
        title: "Don't Miss Out on Savings",
        date: "15 July 2023"
    },
    {
        image: IMAGES.brand1,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
]

const SwipeData = [
    {
        image: IMAGES.small1,
        title: "New Arrivals Alert!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small2,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
    {
        image: IMAGES.brand5,
        title: "Exclusive Discounts Inside",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small4,
        title: "Limited Stock - Act Fast!",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small5,
        title: "Get Ready to Shop",
        date: "15 July 2023"
    },
    {
        image: IMAGES.brand2,
        title: "Don't Miss Out on Savings",
        date: "15 July 2023"
    },
    {
        image: IMAGES.small7,
        title: "Flash Sale Announcement",
        date: "15 July 2023"
    },
]

const Notification = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    const [lists, setLists] = useState<any>(SwipeData);

    const deleteItem = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };

    const [lists4, setLists4] = useState<any>(Swipe4Data);

    const deleteItem4 = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists4];
        arr.splice(index, 1);
        setLists4(arr);
    };

    return (
        <View style={{backgroundColor:theme.dark ? colors.background :colors.card,flex:1}}>
            <Header
                title='Notifications (12)'
                leftIcon='back'
                titleLeft
                rightIcon1={'search'}
            />
            <View 
                style={{
                    height:40,
                    backgroundColor:COLORS.title,
                }}
            >
                <View style={[GlobalStyleSheet.container,{padding:10,paddingHorizontal:0}]}>
                    <View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{paddingHorizontal:20,flexGrow:1}}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>
                                {PopoulerData.map((data:any,index) => {
                                    return(
                                        <TouchableOpacity 
                                            key={index}
                                        >
                                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                {data.image ? 
                                                    <Image
                                                        style={{height:16,width:16,resizeMode:'contain',}}
                                                        source={data.image}
                                                    />
                                                :null}
                                                <Text style={[FONTS.fontMedium,{fontSize:15,color:data.active ? COLORS.primary :COLORS.card}]}>{data.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom:50}}>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingBottom:0}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingVertical:5,padding:0,borderBottomWidth:1,borderBlockColor:COLORS.primaryLight}]}>
                    <Image
                        style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                        source={IMAGES.ads8}
                    />
                </View>
                <View style={[GlobalStyleSheet.container,{padding:0,paddingBottom:10}]}>
                    <GestureHandlerRootView style={{}}>
                            {lists4.map((data:any,index:any) => {
                                return(
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} colors={colors} handleDelete={() => deleteItem4(index)} />
                                    </View>
                                )
                            })}
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Notification