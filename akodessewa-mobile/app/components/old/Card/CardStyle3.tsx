import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import LikeBtn from '../LikeBtn';
import FeatherIcon from "react-native-vector-icons/Feather";
import DropShadow from 'react-native-drop-shadow';

const CardStyle3 = ({ title, CardStyle4, price, discount, image, btntitel, onPress, removebtn, grid, review ,likeBtn,offer,CardStyle5,success,hascolor}) => {

    const theme = useTheme();
    const { colors } = theme;

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor:colors.card,
                borderRadius:20,
                marginTop:20
            }}
            onPress={() => navigation.navigate('ProductDetails')}
        >
            <View>
                <Image
                    style={{ height: undefined, width:SIZES.width / 2.8,aspectRatio:1/.8,resizeMode:'contain' }}
                    source={image}
                />
            </View>
            <View style={{flex:1,}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProductDetails')}
                >
                    <Text numberOfLines={1} style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title ,flex:1}}>{title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                    <Text style={{ ...FONTS.fontJostSemiBoldItalic, fontSize: 18, color:COLORS.primary, }}>{price}</Text>
                    <Text
                        style={{
                            ...FONTS.fontJostItalic,
                            fontSize: 14,
                            textDecorationLine: 'line-through',
                            textDecorationColor: 'rgba(0, 0, 0, 0.70)',
                            color: theme.dark ? 'rgba(255,255,255,.7)' : 'rgba(0, 0, 0, 0.70)',
                            marginRight: 5
                        }}>{discount}
                    </Text>
                    {grid
                        ?
                        <Image
                            style={{ height: 12, width: 12, resizeMode: 'contain', }}
                            source={IMAGES.star4}
                        />
                        :
                        CardStyle4 ?
                        <Image
                            style={{ height: 12, width: 12, resizeMode: 'contain', }}
                            source={IMAGES.star4}
                        />
                        :
                        null
                    }
                    {grid
                        ?
                        <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: theme.dark ? 'rgba(255,255,255,.5)' : 'rgba(0, 0, 0, 0.50)' }}>{review}</Text>
                        :
                        CardStyle4 ?
                        <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: theme.dark ? 'rgba(255,255,255,.5)' : 'rgba(0, 0, 0, 0.50)' }}>{review}</Text>
                        :
                        <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: colors.title }}>Qty:<Text style={{ ...FONTS.fontRegular, fontSize: 14 }}>2</Text></Text>
                    }
                </View>
                {/* {grid ? 
                    <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: COLORS.success, marginTop: 5 }}>In Delivery</Text>
                    :
                    null
                } */}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                    {grid ?
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:hascolor ? COLORS.success :COLORS.danger, marginTop: 5 }}>{offer}</Text>
                    :
                    CardStyle5 ?
                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:success == true ? COLORS.success : COLORS.danger, marginTop: 5 }}>{offer}</Text>
                    :
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:COLORS.danger, marginTop: 5 }}>Remove To Wishlist</Text>
                    }
                    <View>
                        {removebtn ?
                            null
                            :
                            grid ? 
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 10,
                                    height:  32,
                                    width: 100,
                                    justifyContent: 'center',
                                    position:'absolute',
                                    bottom:-15,
                                    right:10
                                }}
                                onPress={() => onPress && onPress()}
                            >     
                                <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:COLORS.white }}>{btntitel}</Text>

                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2,
                                    position: 'absolute',
                                    right: 10,
                                    bottom: -20,
                                    backgroundColor:COLORS.primary,
                                    height:40,
                                    width:40,
                                    justifyContent: 'center',
                                    borderRadius:50
                                }}
                                onPress={() => onPress && onPress()}
                            >
                                 <FeatherIcon size={18} color={COLORS.card} name={'plus'} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
            {likeBtn ?
                <TouchableOpacity style={[ { position: 'absolute', top: 0, right: 0}]}>
                    <LikeBtn />
                </TouchableOpacity>
                :
                null
            }
        </TouchableOpacity>
    )
}

export default CardStyle3