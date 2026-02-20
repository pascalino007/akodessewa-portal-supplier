import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LikeBtn from '../LikeBtn';
import { IMAGES, FONTS, COLORS } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';


const Cardstyle4 = ({image,title,price,discount,marginTop,onPress}) => {

    const theme = useTheme();
    const {colors} = theme;

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => onPress && onPress()} 
        >
            <View style={{
                height:undefined,
                width:'100%',
                aspectRatio:1/1.2,
                borderRadius:150,
                backgroundColor:colors.card,
                borderBottomLeftRadius:0,
                borderBottomRightRadius:0,
                alignItems:'center',
                marginTop:marginTop ? 80 :50
            }}> 
                <View style={{marginTop:-60}}>
                    <Image
                        style={{height:undefined,width:'100%',aspectRatio:1/1,resizeMode:'contain'}}
                        source={image}
                    />
                </View>
                <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.title,textAlign:'center',marginTop:5}}>{title}</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:20,justifyContent:'space-between',marginLeft:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                        <Text style={{...FONTS.fontJostSemiBoldItalic,fontSize:18,color:COLORS.primary}}>{price}</Text>
                        <Text style={{...FONTS.fontJostLightItalic,fontSize:18,color:colors.title,textDecorationLine:'line-through'}}>{discount}</Text>
                    </View>
                    <View>
                        <LikeBtn/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Cardstyle4