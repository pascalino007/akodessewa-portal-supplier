import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

const Button = ({ title, color, onPress, style, size, badge, btnRounded, text, icon, fullWidth, outline, height }) => {

    const theme = useTheme();
    const { colors } = theme;

    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => onPress && onPress()}
            style={[{
                height: outline ? 48 : 55,
                paddingHorizontal: 25,
                paddingVertical: 13,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: btnRounded ? 30 : 10,
                backgroundColor: color ? color : outline ? colors.card : COLORS.primary,
                borderWidth: outline ? 1 : null,
                borderColor: theme.dark ? COLORS.white : outline ? colors.borderColor : null,
            }, size === 'sm' && {
                paddingHorizontal: 15,
                paddingVertical: 10,
                height: height ? 46 : 40,
                borderRadius:10
            }, size === 'lg' && {
                paddingHorizontal: 35,
                paddingVertical: 16,
                height: 58,
            }, icon && {
                paddingLeft: 65,
                paddingRight: fullWidth ? 65 : 25,
            }, style && { ...style }]}
        >
            {icon &&
                <View style={{
                    height: outline ? 48 : 55,
                    width: outline ? 48 : 55,
                    borderRadius: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: outline ? colors.title : theme.dark ? COLORS.title : COLORS.white,
                    borderWidth: outline ? null : 2,
                    borderColor: color ? color : outline ? null : COLORS.primary,
                    position: 'absolute',
                    left: 0,

                }}>
                    {icon}
                </View>
            }
            <Text style={[
                {

                    ...FONTS.fontRegular,
                    fontSize:18,
                    textAlign: outline ? null : 'center',
                    color: text ? text : outline ? colors.title : theme.dark ? COLORS.title : COLORS.white,
                }, size === 'sm' && {
                    fontSize: 14,
                }, size === 'lg' && {
                    fontSize: 18,
                }, outline && {
                    ...FONTS.fontMedium
                }
            ]}>{title}</Text>
            {badge &&
                <View style={{ marginVertical: -4, marginLeft: 8 }}>
                    {badge()}
                </View>
            }
        </TouchableOpacity>
    );
};


export default Button;