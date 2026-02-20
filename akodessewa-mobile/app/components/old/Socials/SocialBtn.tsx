import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';

const SocialBtn = (props) => {

    const { onPress } = props;

    const theme = useTheme();
    const { colors } = theme;

    return (
        <TouchableOpacity
            style={[{
                backgroundColor: props.color ? props.color : COLORS.primary,
                // paddingVertical: 12,
                overflow: 'hidden',
                paddingLeft: 20,
                paddingRight: 20,
                height: 55,
                alignItems: 'center',
                flexDirection: 'row',
                gap:props.gap ? 0: 20,
                justifyContent: 'center'
            }, props.rounded && {
                borderRadius: 30,
            }]}
            onPress={onPress}
        >
            <View
                style={[{

                    // width: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, props.rounded && {
                    borderRadius: 30,
                }]}
            >
                {props.icon}
            </View>
        </TouchableOpacity>
    );
};



export default SocialBtn;