import React, { useState } from 'react'
import { View, Text ,Image,TouchableOpacity, StyleSheet} from 'react-native'
import { COLORS, FONTS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import LikeBtn from '../LikeBtn';
import { IMAGES } from '../../constants/Images';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromwishList } from '../../redux/reducer/wishListReducer';


type Props = {
    id : string,
    title : string;
    color : any;
    price : string;
    image ?: any;
    offer : string;
    hascolor?:any;
    brand?:any;
    discount?:any;
    wishlist?:any;
    background?:any;
    borderTop?:any;
    onPress ?: (e : any) => void,
    onPress2 ?: (e : any) => void,
    onPress3 ?: (e : any) => void,
    onPress4 ?: (e : any) => void,
}

const Cardstyle1 = ({id,title,price,image,offer,hascolor,onPress,discount,wishlist,onPress2,background,onPress3,onPress4}:Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navagation = useNavigation();

    const dispatch = useDispatch();

    const [show, setshow] = useState(false)

    const wishList = useSelector((state:any) => state.wishList.wishList);

    const inWishlist = () => {
        var temp = [] as any;
        wishList.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromWishList = () => {
        dispatch(removeFromwishList(id as any));
    }


  return (
    <TouchableOpacity
        activeOpacity={.8}
        style={{
            backgroundColor:background ? colors.background :theme.dark ? colors.background :colors.card,
            width:'100%',
            height:undefined,
            //aspectRatio:hascolor ? wishlist ? 1/1.85 : 1/1.3 : 1/1.6,
            paddingBottom:20,
            paddingHorizontal:0
        }}
        onPress={onPress} 
    >
        <View style={[styles.cardimage,{backgroundColor:background ? colors.card :theme.dark ? 'rgba(255,255,255,.1)' :colors.background}]}>
            <Image
                style={{ height: undefined, width: '100%', aspectRatio: 1/.7,resizeMode:'contain'}}
                source={image}
            />
        </View>
        <TouchableOpacity  style={{position:'absolute',right:0,top:-5}}>
            {wishlist ?
                <TouchableOpacity 
                    onPress={onPress3}
                    style={{marginTop:15,marginRight:15}}>
                    <Image
                        style={{height:18,width:18,tintColor:COLORS.danger}}
                        source={IMAGES.delete}
                    />
                </TouchableOpacity> 
            :
                <LikeBtn
                    id={id}
                    onPress={inWishlist().includes(id) ? removeItemFromWishList : onPress3}
                    inWishlist={inWishlist}
                />
            }
        </TouchableOpacity>
        <View style={{paddingHorizontal:hascolor ? 0 :0,marginTop:hascolor ? 0 : 5}}>
            <Text style={[styles.cardTitle,{color:colors.title}]}>{title}</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:2}}>
                <Image
                    style={{height:14,width:70}}
                    source={IMAGES.star7}
                />
                <Text style={[styles.cardsubTitle,{color:colors.title,opacity:.5}]}>(270 Review)</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:2,gap:5}}>
                <Text style={[styles.cardprice,{color:colors.title}]}>{price}</Text>
                <Text style={[styles.cardUnderlineText,{color:colors.title}]}>{discount}</Text>
                <Text style={[styles.cardsubTitle,{color:'#CD005D',}]}>{offer}</Text>
            </View>
        </View>
        {wishlist ?
            <View style={{paddingHorizontal:0,marginTop:10,}}>
                <TouchableOpacity
                    //onPress={() => setshow(!show)}
                    onPress={onPress4}
                    activeOpacity={0.5}
                    style={styles.cardbtn}
                >
                        <Text style={[styles.cardsubTitle,{fontSize:14}]}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
            :
            null
        }
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    cardimage:{
        height:undefined,
        width:'100%',
        aspectRatio:1/1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6
    },
    cardTitle:{
        ...FONTS.fontMedium,
        fontSize:14,
        color:COLORS.title,
        marginTop:5,
        paddingRight:10
    },
    cardsubTitle:{
        ...FONTS.fontMedium,
        fontSize:12,
        color:COLORS.title,
    },
    cardUnderlineText:{
        ...FONTS.fontRegular,
        fontSize:13,
        color:COLORS.title,
        textDecorationLine:'line-through',
        opacity:.6
    },
    cardprice:{
        ...FONTS.fontSemiBold,
        fontSize:16,
        color:COLORS.title
    },
    cardbtn:{
        height:40,
        width:'100%',
        borderWidth:2,
        borderColor: COLORS.secondary,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.secondary
    }
})

export default Cardstyle1