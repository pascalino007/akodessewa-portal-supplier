import React ,{useState} from 'react'
import { View, Text ,ScrollView, Image, TouchableOpacity ,} from 'react-native'
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS,FONTS, SIZES } from '../constants/theme';

const CheckoutItems = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth:1,
            height:40,
            borderRadius:6,
            borderColor:COLORS.inputborder,
            overflow:'hidden'
        }}
    >
        <TouchableOpacity
            onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
            style={{
                height: 40,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth:1,
                borderRightColor:COLORS.inputborder,
                backgroundColor:theme.dark ? 'rgba(255,255,255,.01)' : '#E4ECF4',
            }}
        >
             <FeatherIcon size={20} color={colors.text} name={'minus'} />
        </TouchableOpacity>
        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title, width: 45,textAlign:'center' }}>{itemQuantity}</Text>
        <TouchableOpacity
            onPress={() => setItemQuantity(itemQuantity + 1)}
            style={{
                height: 40,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth:1,
                borderLeftColor:COLORS.inputborder,
                backgroundColor:theme.dark ? 'rgba(255,255,255,.01)' : '#E4ECF4',
            }}
        >
            <FeatherIcon size={20} color={colors.text} name={'plus'} />
        </TouchableOpacity>
    </View>
  )
}

export default CheckoutItems