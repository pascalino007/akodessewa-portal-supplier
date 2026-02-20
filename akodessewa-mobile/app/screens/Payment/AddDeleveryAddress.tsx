import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import Header from '../../layout/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS,FONTS } from '../../constants/theme';
import Input from '../../components/Input/Input';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type AddDeleveryAddressScreenProps = StackScreenProps<RootStackParamList, 'AddDeleveryAddress'>;

const AddDeleveryAddress = ({navigation} : AddDeleveryAddressScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const productSizes = ["Home", "Shop", "Office"];

    const [activeSize, setActiveSize] = useState(productSizes[0]);

    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Add Delivery Address'
                leftIcon='back'
                titleLeft
                titleRight
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
                        <Text style={styles.tracktitle2}>Cart</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.secondary,opacity:1}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                            <Text style={styles.tracktitle}>2</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Address</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.card}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.card}]}>
                            <Text style={styles.tracktitle}>3</Text>
                        </View>
                        <Text style={styles.tracktitle2}>payment</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:10}]}>
                    <Text style={[styles.cardTitle,{color: colors.title,borderBottomColor:colors.background}]}>Contact Details</Text>
                    <View style={styles.inputCard}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>Full Name</Text>
                        <Input
                            onChangeText={(value) => console.log(value)}
                            backround={colors.card}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>Mobile No.</Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                            keyboardType={'number-pad'}
                        />
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:5}]}>
                <Text style={[styles.cardTitle,{color: colors.title,borderBottomColor:colors.background}]}>Address</Text>
                    <View style={styles.inputCard}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>Pin Code</Text>
                        <Input
                            onChangeText={(value) => console.log(value)}
                            backround={colors.card}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>Address</Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>Locality/Town</Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>City/District</Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.inputTitle,{ color:colors.title }]}>State</Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                        />
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:5}]}>
                    <Text style={[styles.selectTitle,{color:colors.title,borderBottomColor:colors.background }]}>Save Address As</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: 15,
                            paddingBottom: 10
                        }}
                    >
                        {productSizes.map((data, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => setActiveSize(data)}
                                    key={index}
                                    style={[{
                                        height: 40,
                                        width: 75,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: colors.background,
                                        marginHorizontal: 4,
                                        backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)': '#F3F7FA'
                                    }, activeSize === data && {
                                        backgroundColor:COLORS.primary,
                                        borderColor: COLORS.primary,
                                    }]}
                                >
                                    <Text style={[{ ...FONTS.fontMedium, fontSize:14, color:colors.title }, activeSize === data && { color:theme.dark ? COLORS.white : colors.title }]}>{data}</Text>
                                </TouchableOpacity>
                            )
                        })}
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
                        title='Save Address'
                        color={COLORS.primary}
                        text={COLORS.title }
                       onPress={() => navigation.navigate('DeleveryAddress')}
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
    cardTitle:{
        ...FONTS.fontMedium,
        fontSize: 16,
        color: COLORS.title,
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingBottom:15
    },
    inputCard:{
        marginBottom: 15,
        marginTop: 15 
    },
    inputTitle:{
        ...FONTS.fontMedium,
        fontSize: 13,
        color:COLORS.title,
        marginBottom:5
    },
    selectTitle:{
        ...FONTS.fontMedium, 
        fontSize: 18, 
        color:COLORS.title,
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingBottom:15 
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

export default AddDeleveryAddress