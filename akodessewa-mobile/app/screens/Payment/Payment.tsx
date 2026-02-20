import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text ,ScrollView,Image, TouchableOpacity, StyleSheet} from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import CreditCard from '../../components/Card/CreditCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import PaymentAccordion from '../../components/Accordion/PaymentAccordion';
import Button from '../../components/Button/Button';

type PaymentScreenProps = StackScreenProps<RootStackParamList, 'Payment'>;

const Payment = ({navigation} : PaymentScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    return (
        <View style={{backgroundColor:colors.background,flex:1,}}>
            <Header
                title='Paiement'
                leftIcon='back'
                titleLeft
            />
            <View 
                style={[GlobalStyleSheet.container,
                    {   
                        padding:10,
                        paddingHorizontal: 15,
                        backgroundColor:COLORS.title,
                    }
                 ]}
            >
                <View style={[GlobalStyleSheet.flex]}>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                            <Text style={styles.tracktitle}>1</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Panier</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.secondary,opacity:1}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                            <Text style={styles.tracktitle}>2</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Adresse</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.secondary,opacity:1}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                            <Text style={styles.tracktitle}>3</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Paiement</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { marginTop:10,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card }]}>
                    <View style={[styles.addresscard,{borderBottomColor:colors.background }]}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>Carte de crédit/débit</Text>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}
                            onPress={() => navigation.navigate('Addcard')}
                        >
                            <Image
                                style={{ height: 14, width: 14, resizeMode: 'contain',tintColor:COLORS.primary }}
                                source={IMAGES.plus}
                            />
                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:COLORS.primary }}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: -15 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20, paddingLeft: 15, paddingRight: 15 }}
                        >
                            <CreditCard
                                creditcard
                            />
                            <CreditCard
                               debitcard
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container, {padding:0 }]}>
                    <View style={{ marginTop: 10 }}>
                        <PaymentAccordion
                            component
                            Payment
                            netbanking
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View 
                    style={[styles.bottomBtn,{
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                    }]}
                >
                    <Button
                        title='Continuer'
                        color={COLORS.primary}
                        text={COLORS.title }
                        onPress={() => navigation.navigate('Checkout')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tracktitle:{
        ...FONTS.fontMedium,
        fontSize:10,
        color:COLORS.title
    },
    tracktitle2:{
        ...FONTS.fontMedium,
        fontSize:13,
        color:COLORS.card
    },
    addresscard:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingBottom:15,
        borderBottomColor:COLORS.background 
    },
    bottomBtn:{
        height:75,
        width:'100%',
        backgroundColor:COLORS.card,
        justifyContent:'center',
        paddingHorizontal:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: .1,
        shadowRadius: 5,
    }
})

export default Payment