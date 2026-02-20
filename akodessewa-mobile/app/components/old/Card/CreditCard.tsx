import React from 'react';
import { View, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, IMAGES, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';

const CreditCard = ({ debitcard, creditCard, creditcard }) => {

    const theme = useTheme();
    const { colors } = theme;

    return (
        <DropShadow
            style={[{
                shadowColor: "rgba(150, 184, 169, 0.25)",
                shadowOffset: {
                    width: 2,
                    height: 4,
                },
                shadowOpacity: .4,
                shadowRadius: 5,
            }, Platform.OS === "ios" && {
                backgroundColor: colors.card,
                borderRadius: 18
            }]}
        >
            <LinearGradient colors={debitcard ? ['#349D85', '#349D85'] : ['#0D775E', '#0D775E']}
                style={{ width: '100%', height: creditCard ? 180 : 150, width: creditCard ? '100%' : 277, borderRadius: 18, padding: 15 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {creditCard ?
                            null
                            :
                            <View style={{ height: 20, width: 20, borderRadius: 50, borderWidth: 1, borderColor: COLORS.white, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ height: 12, width: 12, backgroundColor: '#fff', borderRadius: 50 }}></View>
                            </View>
                        }
                        {debitcard ?
                            <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: COLORS.white }}>DEBIT CARD</Text>
                            :
                            <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: COLORS.white }}>CREDIT CARD</Text>
                        }
                    </View>
                    <Image
                        style={{ height: debitcard ? 24 : 17, width: 50, resizeMode: 'contain' }}
                        source={debitcard ? IMAGES.card1 : IMAGES.card}
                    />
                </View>
                <Text style={{ ...FONTS.fontMedium, fontSize: creditCard ? 20 : 18, color: COLORS.white, paddingVertical: 20, paddingTop: creditCard ? 40 : 20 }}>**** **** **** 4532</Text>
                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.white, marginTop: creditcard ? 15 : creditCard ? 20 : 10 }}>ROOPA SMITH</Text>
                <View style={{ position: 'absolute', bottom: creditCard ? 20 : 10, right: 20, flexDirection: 'row', gap: 25 }}>
                    <View>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: COLORS.white, opacity: 0.5 }}>EXP</Text>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.white }}>14/07</Text>
                    </View>
                    <View>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: COLORS.white, opacity: 0.5 }}>CVV</Text>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.white }}>012</Text>
                    </View>
                </View>
            </LinearGradient>
        </DropShadow>
    )
}

export default CreditCard