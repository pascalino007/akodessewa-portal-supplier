import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import LikeBtn from '../LikeBtn';

const Cardstyle2 = ({ image, price, discount, delivery, title, mindiscount, onPress,marginTop,likebtn }) => {

    const theme = useTheme();
    const { colors } = theme;

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={{ backgroundColor: colors.card, borderRadius: 15,marginTop:marginTop ? 15 : 0, }}
            onPress={() => onPress && onPress()} 
        >
            <View style={{paddingHorizontal:15,paddingTop:15}}>
                <Text style={{ ...FONTS.fontMedium, fontSize:16, color: colors.title,}}>{title}</Text>
            </View>
            <Image
                style={{ width: '100%', height: undefined, aspectRatio: 1 /1,resizeMode:'contain' }}
                source={image}
            />
            <View style={{ padding: 15,paddingTop:0, alignItems:mindiscount ? 'center' : null,  }}>
                {mindiscount
                    ?
                    <View>
                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 15, color: COLORS.success }}>{discount}</Text>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text style={{ ...FONTS.fontJostSemiBoldItalic, fontSize: 14, color:COLORS.primary, marginTop: 2 }}>{price}</Text>
                        <Text
                            style={{
                                ...FONTS.fontJostItalic,
                                fontSize: 12,
                                textDecorationLine: 'line-through',
                                textDecorationColor: 'rgba(0, 0, 0, 0.70)',
                                color: theme.dark ? 'rgba(255,255,255, .7)' : 'rgba(0, 0, 0, 0.70)',
                                marginRight: 5
                            }}>{discount}
                        </Text>
                        <Text numberOfLines={1} style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.success ,}}>{delivery}</Text>
                    </View>
                }
            </View>
            {likebtn
                ?
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
                :
                null
            }
        </TouchableOpacity>
    )
}

export default Cardstyle2