import React from 'react';
import { Text, View, Image } from 'react-native';
//import FeatherIcon from "react-native-vector-icons/Feather";
import Ripple from 'react-native-material-ripple';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    icon : any;
    onPress : any;
    title : string;
}

const ListItem = ({icon, onPress, title} : Props) => {


    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    return (
        <View>
            <Ripple
                onPress={() => onPress()}
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 15,
                    height: 48,
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: SIZES.radius,

                }}
            >
                {icon ?
                    <View style={{
                        height: 30,
                        width: 30,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                    }}>
                        {icon}

                    </View>
                    :
                    null
                }

                <Text style={{ ...FONTS.fontRegular,fontSize:16, color: colors.title, flex: 1 }}>{title}</Text>
                <Ionicons  style={{ opacity: .8 }} color={colors.text} name={'chevron-right'} size={20} />
            </Ripple>
        </View>
    )
}

export default ListItem;