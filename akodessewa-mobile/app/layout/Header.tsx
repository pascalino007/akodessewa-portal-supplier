import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
// import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    title : string,
    leftIcon ?: string,
    leftAction ?: any,
    transparent?:any,
    productId?:any,
    titleLeft?:any,
    titleLeft2?:any,
    titleRight?:any,
    rightIcon1?:any,
    rightIcon2?:any,
    rightIcon3?:string,
}


const Header = ({title, leftIcon, leftAction,transparent,productId,titleLeft,titleLeft2,titleRight,rightIcon1,rightIcon2,rightIcon3} : Props) => {

    const wishList = useSelector((state:any) => state.wishList.wishList);

    const cart = useSelector((state:any) => state.cart.cart);

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    return (
        <LinearGradient
            colors={[COLORS.primary , COLORS.primaryDark]}
            style={[{
                height: 60,
                backgroundColor:COLORS.primary,
                alignItems:'center',
                justifyContent:'center'
            },transparent && {
                position: 'absolute',
                left: 0,
                right: 0,
                borderBottomWidth: 0,
            },Platform.OS === 'ios' && {
                backgroundColor:colors.card
            }]}
        >
             <View style={[GlobalStyleSheet.container, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    //paddingTop:10
                }]}
                >
                    {leftIcon === 'back' && 
                        <TouchableOpacity 
                        onPress={() => leftAction ? leftAction() : navigation.goBack()}
                        style={[styles.actionBtn,{}]}
                        >
                            <FeatherIcon size={24} color={COLORS.white} name={'chevron-left'} />
                        </TouchableOpacity>
                    }
                    <View style={{ flex: 1}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: COLORS.white, textAlign: titleLeft ? 'left' : 'center',paddingLeft:titleLeft2 ? 10 :10,paddingRight:titleRight ? 20 : 0}}>{title}</Text>
                        {productId &&
                            <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', marginTop: 2 }}>{productId}</Text>
                        }
                    </View>
                    {rightIcon1 == "search" &&
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            onPress={() => navigation.navigate('Search')}
                            style={[styles.actionBtn,{}]}
                        >
                            <FeatherIcon size={22} color={COLORS.white} name={'search'} />
                        </TouchableOpacity>
                    }
                    {rightIcon3  &&
                        <View
                            //onPress={() => leftAction ? leftAction() : navigation.goBack()}
                            style={[styles.actionBtn,{}]}
                        >
                                <FontAwesome size={18} color={COLORS.white} name={'heart'} />
                                <View style={[GlobalStyleSheet.notification, { position: 'absolute', right: 0, bottom: 18,backgroundColor:COLORS.danger }]}>
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 12, color:COLORS.card }}>{wishList.length}</Text>
                                </View>
                        </View>
                    }
                    {rightIcon2 == "cart" &&
                        <TouchableOpacity
                            activeOpacity={0.5} 
                            onPress={() => navigation.navigate('MyCart')}
                            style={[styles.actionBtn,{marginLeft:10}]}
                        >
                            {/* <Image
                                style={{height:20,width:20,tintColor:COLORS.title}}
                                source={IMAGES.mycart}
                            /> */}
                            <FontAwesome size={20} color={COLORS.white} name={'shopping-cart'} />
                            <View style={[GlobalStyleSheet.notification, { position: 'absolute', right: 0, bottom: 20,backgroundColor:COLORS.danger }]}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 10, color:COLORS.card }}>{cart.length}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    header : {
        height:60,
        backgroundColor:COLORS.card,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    title : {
        fontSize:20,
        ...FONTS.fontMedium,
    },
    actionBtn : {
        height: 35,
        width: 35,
        borderRadius:6,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:'rgba(255,255,255,0.2)'
        // position:'absolute',
        // left:10,
        // top:10,
    }
})

export default Header;