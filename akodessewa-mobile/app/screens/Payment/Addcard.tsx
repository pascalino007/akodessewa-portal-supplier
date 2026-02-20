import React from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text,ScrollView, StyleSheet } from 'react-native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CreditCard from '../../components/Card/CreditCard';
import Input from '../../components/Input/Input';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type AddcardScreenProps = StackScreenProps<RootStackParamList, 'Addcard'>;

const Addcard = ({navigation} : AddcardScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
       <View style={{flex:1,backgroundColor:'#8AE7ED'}}>
            <Header
                title='Add Card'
                leftIcon='back'
                titleLeft
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[styles.backgroundData,{backgroundColor:theme.dark ? colors.background :colors.card,}]}>
                    <View style={{marginTop:-120}}>
                        <View style={[GlobalStyleSheet.container,{zIndex:20}]}>
                            <CreditCard
                                creditCard
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.container,{marginTop:0}]}>
                        <View style={{ marginBottom: 15, marginTop: 0 }}>
                            <Input
                                placeholder='Card Name'
                                onChangeText={(value) => console.log(value)}
                                backround={colors.card}
                            />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Input
                                placeholder='Card Number'
                                onChangeText={(value) => console.log(value)}
                                backround={colors.card}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <View style={[GlobalStyleSheet.flex,{ gap: 20, paddingRight: 20 }]}>
                            <View style={{ marginBottom: 15, width: '50%' }}>
                                <Input
                                    placeholder='Expiry Date'
                                    onChangeText={(value) => console.log(value)}
                                    backround={colors.card}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                            <View style={{ marginBottom: 15, width: '50%' }}>
                                <Input
                                    placeholder='CVV'
                                    onChangeText={(value) => console.log(value)}
                                    backround={colors.card}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                        </View>
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
                        title='Add Card'
                        color={COLORS.primary}
                        text={COLORS.title}
                        onPress={() => navigation.navigate('Payment')}
                    />
                </View>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    backgroundData:{
        backgroundColor:COLORS.card,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingBottom:0,
        flex:1,
        marginTop:120
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

export default Addcard