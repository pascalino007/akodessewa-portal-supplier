import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { IMAGES,} from '../constants/Images'
import { FONTS,COLORS } from '../constants/theme'
import { useNavigation, useTheme } from '@react-navigation/native'
import { GlobalStyleSheet } from '../constants/StyleSheet'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'


const brand2Data = [
    {
        id:"1",
        title:'Samsung',
        image:IMAGES.LED1
    },
    {
        id:"2",
        title:'Sony',
        image:IMAGES.LED2
    },
    {
        id:"3",
        title:'Acer',
        image:IMAGES.LED3
    },
    {
        id:"4",
        title:'LG',
        image:IMAGES.LED4
    },
    {
        id:"5",
        title:'Acer',
        image:IMAGES.LED3
    },
    {
        id:"6",
        title:'LG',
        image:IMAGES.LED4
    },
    {
        id:"7",
        title:'Samsung',
        image:IMAGES.LED1
    },
    {
        id:"8",
        title:'Sony',
        image:IMAGES.LED2
    },
    {
        id:"9",
        title:'Acer',
        image:IMAGES.LED3
    },
  ]
const brand5Data = [
    {
        id:"1",
        image:IMAGES.brand1
    },
    {
        id:"2",
        image:IMAGES.brand7
    },
    {
        id:"3",
        image:IMAGES.brand5
    },
    {
        id:"4",
        image:IMAGES.brand12
    },
    {
        id:"5",
        image:IMAGES.brand9
    },
    {
        id:"6",
        image:IMAGES.brand8
    },
    {
        id:"7",
        image:IMAGES.brand10
    },
    {
        id:"8",
        image:IMAGES.brand11
    },
    {
        id:"9",
        image:IMAGES.brand6
    },
    {
        id:"10",
        image:IMAGES.brand4
    },
    {
        id:"3",
        image:IMAGES.brand5
    },
    {
        id:"4",
        image:IMAGES.brand12
    },
  ]
const brand3Data = [
    {
        id:"1",
        title:'Kide',
        image:IMAGES.item05
    },
    {
        id:"2",
        title:'Shirt',
        image:IMAGES.item06
    },
    {
        id:"3",
        title:'Jans',
        image:IMAGES.item02
    },
  ]
const brand4Data = [
    {
        id:"1",
        title:'Wooden',
        image:IMAGES.item6
    },
    {
        id:"1",
        title:'Chair',
        image:IMAGES.item7
    },
    {
        id:"1",
        title:'Chair',
        image:IMAGES.item8
    },
  ]

const CategoryCart = () => {

 const theme = useTheme();
const { colors } : {colors : any} = theme;

const navigation = useNavigation<any>();

  return (
    <View style={{backgroundColor:colors.background}}>
        <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,backgroundColor:theme.dark ? 'rgba(255,255,258,.1)':colors.card,}]}>
            <View style={[styles.maincardData,{borderBottomColor:colors.background}]}>
                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>Televisions</Text>
            </View>
            <View style={styles.cardData}>
                {brand2Data.map((data:any,index) => {
                    return(
                        <TouchableOpacity 
                            key={index} 
                            style={{alignItems:'center',}}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Products')}
                        >
                            <View style={[styles.imagecard,{backgroundColor:colors.background}]}>
                                <Image
                                    style={[{height:38,width:60,resizeMode:'contain'}]}
                                    source={data.image}
                                />
                            </View>
                            <Text style={[styles.imageTitle,{color:colors.title}]}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,backgroundColor:theme.dark ? 'rgba(255,255,258,.1)':colors.card,marginTop:8}]}>
            <View style={[styles.maincardData,{borderBottomColor:colors.background}]}>
                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>All Fashion</Text>
            </View>
            <View style={styles.cardData}>
                {brand3Data.map((data:any,index) => {
                    return(
                        <TouchableOpacity 
                            key={index} 
                            style={{alignItems:'center',}}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Products')}
                        >
                             <View style={[styles.imagecard,{backgroundColor:colors.background}]}>
                                <Image
                                    style={[{height:70,width:70,resizeMode:'contain'}]}
                                    source={data.image}
                                />
                            </View>
                            <Text style={[styles.imageTitle,{color:colors.title}]}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,backgroundColor:theme.dark ? 'rgba(255,255,258,.1)':colors.card,marginTop:8}]}>
            <View style={[styles.maincardData,{borderBottomColor:colors.background}]}>
                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>All furniture</Text>
            </View>
            <View style={styles.cardData}>
                {brand4Data.map((data:any,index) => {
                    return(
                        <TouchableOpacity 
                            key={index} 
                            style={{alignItems:'center',}}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Products')}
                        >
                            <View style={[styles.imagecard,{backgroundColor:colors.background}]}>
                                <Image
                                    style={[{height:70,width:70,resizeMode:'contain'}]}
                                    source={data.image}
                                />
                            </View>
                            <Text style={[styles.imageTitle,{color:colors.title}]}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{paddingVertical:0,padding:0,}]}>
            <Image
                style={{width:'100%',height:undefined,aspectRatio:1/.3,resizeMode:'contain'}}
                source={IMAGES.ads4}
            />
        </View>
        <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,backgroundColor:theme.dark ? 'rgba(255,255,258,.1)':colors.card,marginTop:0}]}>
            <View style={[styles.maincardData,{borderBottomColor:colors.background}]}>
                <Text style={[FONTS.fontMedium,{fontSize:14,color:colors.title}]}>Brands</Text>
            </View>
            <View style={[styles.cardData,{paddingHorizontal:10,gap:10}]}>
                {brand5Data.map((data:any,index) => {
                    return(
                        <TouchableOpacity 
                            key={index} 
                            style={{alignItems:'center',}}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Products')}
                        >
                            <View style={[{height:60,width:60,borderRadius:50,borderWidth:1,borderColor:COLORS.background,alignItems:'center',justifyContent:'center'}]}>
                                <Image
                                    style={[{height:40,width:40,resizeMode:'contain',borderRadius:50}]}
                                    source={data.image}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    maincardData:{
        paddingHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        paddingBottom:15
    },
    cardData:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingHorizontal:20,
        paddingTop:20,
        alignItems:'center',
        justifyContent:'center',
        gap:20
    },
    imagecard:{
        height:70,
        width:70,
        borderRadius:50,
        backgroundColor:COLORS.background,
        alignItems:'center',
        justifyContent:'center'
    },
    imageTitle:{
        ...FONTS.fontRegular,
        fontSize:13,
        color:COLORS.title,
        marginTop:10
    }
})

export default CategoryCart