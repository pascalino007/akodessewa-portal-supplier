import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LikeBtn from '../LikeBtn';
import { IMAGES, FONTS, COLORS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';

const CardStyle1 = ({ image, title, price, discount, closebtn,removelikebtn, onPress, likebtn,card3,Cardstyle4,offer }) => {
    const theme = useTheme();
    const { colors } = theme;

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={{borderRadius:20,borderColor:colors.title,backgroundColor:card3 ? null :colors.card,alignItems:card3 ? 'center' : null}}
            onPress={() => onPress && onPress()}
        >
            <View style={{backgroundColor:card3 ? colors.card : null ,width:card3 ? 127: null,height:card3 ? 127: null,alignItems:'center',justifyContent:'center',borderRadius:card3 ? 30: null}}>
                <Image
                    style={{ height: undefined, width: '100%', aspectRatio:1/1, borderRadius: 10,borderBottomLeftRadius:0,borderBottomRightRadius:0,resizeMode:'contain' }}
                    source={image}
                />
            </View>
            <View style={{ padding:Cardstyle4 ? 20 :10,paddingTop:Cardstyle4 ? 0 : null,backgroundColor:card3 ? null :colors.card,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignItems:card3 ?'center':null }}>
                {Cardstyle4 ?
                    <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.success,marginBottom:5}}>{offer}</Text> 
                    :
                    null
                }
                <Text style={{ ...FONTS.fontMedium, fontSize:card3 ?  16 : 18, color: colors.title,textAlign:card3 ? 'center' : null }}>{title}</Text>
                <View style={{ position:Cardstyle4 ? 'absolute' : null,bottom:Cardstyle4 ? 20 : null,right:Cardstyle4 ? 20 : null,flexDirection:Cardstyle4 ? 'column' : 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                    {Cardstyle4 ?

                        <Text style={{ ...FONTS.fontSemiBold, fontSize:card3 ?  16 : 18, color: colors.title, }}>{price}</Text>
                        :
                        <Text style={{ ...FONTS.fontJostMediumItalic, fontSize:card3 ?  16 : 18, color:COLORS.primary, }}>{price}</Text>
                    }
                    {Cardstyle4 ?

                        <Text
                        style={{
                            ...FONTS.fontRegular,
                            fontSize:card3 ?  13 : 14,
                            textDecorationLine: 'line-through',
                            color: theme.dark ? 'rgba(255,255,255, .4)' : 'rgba(0, 0, 0, 0.40)',
                        }}>{discount}
                        </Text>
                        :
                        <Text
                            style={{
                                ...FONTS.fontJostLightItalic,
                                fontSize:card3 ?  13 : 14,
                                textDecorationLine: 'line-through',
                                color: theme.dark ? 'rgba(255,255,255, .4)' : 'rgba(0, 0, 0, 0.40)',
                                marginRight: 5
                            }}>{discount}
                        </Text>
                    }
                </View>
            </View>
            {likebtn
                ?
                <View style={{ position: 'absolute', right: 15, top: 10 }}>
                    <TouchableOpacity
                        style={{
                            height: 38,
                            width: 38,
                            borderRadius: 38,
                            backgroundColor: 'rgba(0,0,0,.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            style={{ height: 18, width: 18, resizeMode: 'contain', tintColor: COLORS.white }}
                            source={IMAGES.close}
                        />
                    </TouchableOpacity>
                </View>
                :
                removelikebtn
                ?
                    null
                :

                <View style={{ position: 'absolute', right: 5, top: 5 }}>
                    <TouchableOpacity
                        style={{
                            height: 38,
                            width: 38,
                            borderRadius: 38,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <LikeBtn />
                    </TouchableOpacity>
                </View>
            }
            {closebtn ?
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 0,right:0 }}
                    onPress={() => navigation.navigate('Shopping')}
                >
                    <View style={{height:45,width:45,backgroundColor:colors.title,alignItems:'center',justifyContent:'center',borderBottomRightRadius:20,borderTopLeftRadius:20}}>
                        <Image
                            style={{height:24,width:24,resizeMode:'contain',tintColor:colors.card}}
                            source={IMAGES.shopping}
                        />
                    </View>
                </TouchableOpacity>
                :
                null
            }
        </TouchableOpacity>
       
    )
}

export default CardStyle1;