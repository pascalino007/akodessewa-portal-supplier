import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text ,ScrollView, Image ,} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/reducer/cartReducer';
import FeatherIcon from 'react-native-vector-icons/Feather';


const CardStyleData =[
    {
        image:IMAGES.item02,
        title:"Chic Craze Fashionable Attire Emporium",
        price:"$199",
        discount:"$112",
        offer:"70% OFF",
        brand:"Apple",
        color:false,
        //hascolor:false
    },
    {
        image:IMAGES.item07,
        title:"Electra Ease Tech and Gadgets Haven",
        price:"$99",
        discount:"$118",
        offer:"70% OFF",
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
        image:IMAGES.item03,
        title:"Class Act Bluetooth Head phones Wireless",
        price:"$149",
        discount:"$114",
        offer:"50% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item08,
        title:"Ergonomic Office Chair",
        price:"$99",
        brand:"Sky",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
    {
        image:IMAGES.item09,
        title:"APPLE iPhone 14 (Bluetooth)",
        price:"$99",
        brand:"Apple",
        discount:"$118",
        offer:"70% OFF",
        hascolor:true
    },
]

type MyCartScreenProps = StackScreenProps<RootStackParamList, 'MyCart'>;

const MyCart = ({navigation} : MyCartScreenProps)=> {

  
const theme = useTheme();
const { colors } : {colors : any} = theme;

const cart = useSelector((state:any) => state.cart.cart);
const dispatch = useDispatch();

const removeItemFromCart = (data: any) => {
    dispatch(removeFromCart(data));
}

  return (
      <View style={{backgroundColor:colors.background,flex:1}}>
          <Header
            title='Mon Panier'
            leftIcon='back'
            titleLeft
            rightIcon2={'cart'}
          />
           {cart.length > 0 ?
                <View 
                    style={[GlobalStyleSheet.container,
                        {   
                            padding:10,
                            paddingHorizontal: 15,
                            backgroundColor:COLORS.title,
                        }
                    ]}
                >
                    <View style={[GlobalStyleSheet.flex]}>
                        <View style={[GlobalStyleSheet.rowcenter]}>
                            <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                                <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.title}]}>1</Text>
                            </View>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:COLORS.card}]}>Panier</Text>
                        </View>
                        <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.card}]}/>
                        <View style={[GlobalStyleSheet.rowcenter]}>
                            <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.card}]}>
                                <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.title}]}>2</Text>
                            </View>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:COLORS.card}]}>Adresse</Text>
                        </View>
                        <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.card}]}/>
                        <View style={[GlobalStyleSheet.rowcenter]}>
                            <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.card}]}>
                                <Text style={[FONTS.fontMedium,{fontSize:10,color:COLORS.title}]}>3</Text>
                            </View>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:COLORS.card}]}>Paiement</Text>
                        </View>
                    </View>
                </View>
                :
                null
            }
            <ScrollView contentContainerStyle={{flexGrow:1,marginTop:10,paddingBottom:10}} showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container,{padding:0}]}>
                    {cart.map((data:any,index:any) => {
                        return(
                            <View key={index} style={{marginBottom:5}}>
                                <Cardstyle2
                                    title={data.title}
                                    price={data.price}
                                    discount={data.discount}
                                    delevery={data.delevery}
                                    image={data.image}
                                    offer={data.offer}
                                    brand={data.brand} 
                                    onPress={() => navigation.navigate('ProductsDetails', {slug: data.slug})}
                                    onPress4={() => removeItemFromCart(data)}
                                    onPress5={() => removeItemFromCart(data)} 
                                />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            {cart.length > 0 ?
                (
                    <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                        <Button
                            title='Passer la commande'
                            color={COLORS.primary}
                            text={COLORS.title}
                            onPress={() => navigation.navigate('DeleveryAddress')}
                        />
                    </View>
                )
                :
                (
                    <View style={[GlobalStyleSheet.container,{padding:0,position:'absolute',left:0,right:0,bottom:0,top:20}]}>
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
                                <FeatherIcon color={COLORS.primary} size={24} name='shopping-cart'/>
                            </View>
                            <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Votre panier est vide !</Text>    
                            <Text
                                style={{
                                    ...FONTS.fontSm,
                                    color:colors.text,
                                    textAlign:'center',
                                    paddingHorizontal:40,
                                }}
                            >Ajoutez des produits et commencez vos achats.</Text>
                        </View>
                    </View>
                )
            }
            
      </View>
  )
}

export default MyCart