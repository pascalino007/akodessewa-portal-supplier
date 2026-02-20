import React, { useState } from 'react'
import {  useTheme } from '@react-navigation/native';
import { View ,ScrollView} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Cardstyle1 from '../../components/Card/Cardstyle1';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducer/cartReducer';
import { removeFromwishList } from '../../redux/reducer/wishListReducer';
import { COLORS, FONTS } from '../../constants/theme';
import { Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';


const cardData =[
  {
      image:IMAGES.item012,
      title:"One Plus Bluetooth Earbuds Wireless",
      price:"$199",
      offer:"30% OFF",
      discount:"$112",
      hascolor:true
  },
  {
      image:IMAGES.item011,
      title:"Auto Alley Automotive Emporium Depot",
      price:"$149",
      offer:"30% OFF",
      discount:"$114",
      color:false,
      hascolor:true
  },
  {
      image:IMAGES.item010,
      title:"Cozy Corner Homestead Solutions",
      price:"$299",
      discount:"$182",
      offer:"30% OFF",
      color:false,
      hascolor:true
  },
  {
      image:IMAGES.item06,
      title:"TrendTraverse Chic Emporium",
      price:"$99",
      offer:"70% OFF",
      discount:"$100",
      color:true,
      hascolor:true
  },
    {
        image:IMAGES.item05,
        title:"Trend Traverse Chic Clothing Collection Hub",
        price:"$199",
        discount:"$112",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item02,
        title:"Chic Craze Fashionable Attire Emporium",
        price:"$149",
        discount:"$114",
        offer:"50% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item01,
        title:"Style Savvy Fashion Finds and Trends",
        price:"$299",
        discount:"$116",
        offer:"70% OFF",
        color:false,
        hascolor:true
    },
    {
        image:IMAGES.item09,
        title:"Iphone 14 Gray Color 256GB ",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]

type WishlistScreenProps = StackScreenProps<RootStackParamList, 'Wishlist'>;

const Wishlist = ({navigation} : WishlistScreenProps) => {

    const wishList = useSelector((state:any) => state.wishList.wishList);
    const dispatch = useDispatch();

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    const removeItemFromWishList = (data: any) => {
        dispatch(removeFromwishList(data));
    }

  const theme = useTheme();
  const { colors } : {colors : any} = theme;


  return (
     <View style={{backgroundColor:theme.dark ? colors.background :colors.card,flex:1}}>
        <Header
          title='My Wishlist'
          leftIcon={'back'}
          rightIcon3={'like'}
          titleLeft
        />
        <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:5,justifyContent:wishList.length === 0 ? 'center' : 'flex-start'}}>
          <View style={[GlobalStyleSheet.container,{padding:10}]}>
                  <View style={[GlobalStyleSheet.row]}>
                      {wishList.map((data:any, index:any) => {
                          return (
                              <View style={[GlobalStyleSheet.col50, { marginBottom:0 }]} key={index}>
                                  <Cardstyle1
                                        id={data.id}
                                        title={data.title}
                                        image={data.image}
                                        price={data.price}
                                        offer={data.offer}
                                        color={data.color}
                                        hascolor={data.hascolor}
                                        discount={data.discount}
                                        wishlist={true}
                                        onPress={() => navigation.navigate('ProductsDetails')}
                                        onPress3={() => removeItemFromWishList(data.id)}
                                        onPress4={() => {addItemToCart(data) ; navigation.navigate('MyCart')}}
                                  />
                              </View>
                          )
                      })}
                  </View>
                  {wishList.length === 0 && 
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <View
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:60,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:COLORS.primaryLight,
                                    marginBottom:20,
                                }}
                            >
                                <FeatherIcon color={COLORS.primary} size={24} name='heart'/>
                            </View>
                            <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your Wishlist is Empty!</Text>    
                            <Text
                                style={{
                                    ...FONTS.fontSm,
                                    color:colors.text,
                                    textAlign:'center',
                                    paddingHorizontal:40,
                                    marginBottom:30,
                                }}
                            >Add Product to you favourite and shop now.</Text>
                        </View>
                    }
              </View>
        </ScrollView>
     </View>
  )
}

export default Wishlist