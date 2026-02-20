import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react'
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Customotp = ({background}) => {

    const { colors } = useTheme();

    return (
        <View>
            <OTPInputView
                style={{ width: "90%", height: 50, }}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={{
                    ...FONTS.h2,
                    ...FONTS.fontJostLight,
                    backgroundColor:background ? colors.background : colors.card,
                    color: colors.title,
                    borderRadius: 10,
                    borderColor: colors.card,
                    height: 48,
                    width: 61,
                    padding: 0

                }}
                // codeInputHighlightStyle={{ borderColor: COLORS.primary }}
                onCodeFilled={(code => {
                    console.log(`Code is ${code}, you are good to go!`)
                })}
            />
        </View>
    )
}

export default Customotp