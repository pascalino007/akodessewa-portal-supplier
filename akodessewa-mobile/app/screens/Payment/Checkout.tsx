import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text ,ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native'
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS,FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createOrder } from '../../redux/slices/ordersSlice';
import { useSelector } from 'react-redux';

const checkoutData = [
    {
        image: IMAGES.map,
        title: "Adresse de livraison",
        text: "123 Main Street, Anytown, USA 12345",
        navigate: "DeleveryAddress"
    },
    {
        image: IMAGES.card2,
        title: "Paiement",
        text: "XXXX XXXX XXXX 3456",
        navigate: "Payment"
    },
]

type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>;

const Checkout =  ({navigation} : CheckoutScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const appDispatch = useAppDispatch();
    const { isCreating } = useAppSelector((state) => state.orders);
    const cart = useSelector((state: any) => state.cart.cart);
    const [notes, setNotes] = useState('');

    const subtotal = cart.reduce((sum: number, item: any) => {
        const numPrice = typeof item.price === 'string'
            ? parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0
            : item.price || 0;
        return sum + numPrice * (item.qty || 1);
    }, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const handleSubmitOrder = async () => {
        try {
            const items = cart.map((item: any) => ({
                productId: item.id,
                quantity: item.qty || 1,
            }));
            await appDispatch(createOrder({ items, notes })).unwrap();
            Alert.alert('Succès', 'Commande passée avec succès !');
            navigation.navigate('Myorder');
        } catch (err: any) {
            Alert.alert('Erreur', typeof err === 'string' ? err : 'Échec de la commande');
        }
    };

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Récapitulatif'
                leftIcon='back'
                titleLeft
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { paddingTop:0,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:10 }]}>
                    {checkoutData.map((data:any, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(data.navigate)}
                                style={[styles.AddressCard,{
                                    borderBottomColor:colors.background,
                                }]}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 ,flex:1}}>
                                    <View style={[styles.AddressCardimage,{ backgroundColor:colors.background,}]}>
                                        <Image
                                            style={[GlobalStyleSheet.image2,{ tintColor:colors.title }]}
                                            source={data.image}
                                        />
                                    </View>
                                    <View style={{flex:1}}> 
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.text }}>{data.text}</Text>
                                    </View>
                                </View>
                                <FeatherIcon size={22} color={colors.title} name={'chevron-right'} />
                                {/* <Ionicons color={colors.title} name='chevron-forward' size={20}/> */}
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title ,marginBottom:10}}>Notes supplémentaires :</Text>
                        <TextInput
                            style={[styles.TextInput,{
                                color: colors.title,
                            }]}
                            placeholder='Écrivez ici'
                            multiline
                            placeholderTextColor={colors.text}
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:15, }]}>
                    <View>
                        <View style={[styles.BottomCard,{borderBottomColor:colors.background}]}>
                            <Text style={styles.CardTitle}>Détails du prix</Text>
                        </View>
                        <View style={[GlobalStyleSheet.flex,{ marginBottom: 5,marginTop:15 }]}>
                            <Text style={styles.CardTitle2}>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</Text>
                            <Text style={styles.CardTitle2}>{subtotal.toLocaleString('fr-FR')} CFA</Text>
                        </View>
                        <View style={[GlobalStyleSheet.flex,{ marginBottom: 15 }]}>
                            <Text style={styles.CardTitle2}>Frais de livraison</Text>
                            <Text style={[styles.CardTitle2,{color:COLORS.success }]}>{shipping === 0 ? 'Gratuit' : `${shipping.toLocaleString('fr-FR')} CFA`}</Text>
                        </View>
                        <View style={[styles.BottomTitle,{borderTopColor:colors.background}]}>
                            <Text style={styles.CardTitle}>Total</Text>
                            <Text style={[styles.CardTitle,{color:COLORS.success}]}>{total.toLocaleString('fr-FR')} CFA</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
                <View 
                    style={[styles.bottomBtn,{
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                    }]}
                >
                    <Button
                        title={isCreating ? 'Envoi en cours...' : 'Valider la commande'}
                        color={COLORS.primary}
                        text={COLORS.title}
                        onPress={handleSubmitOrder}
                    />
                </View>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    AddressCard:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor:COLORS.background,
        paddingBottom: 15,
        marginTop: 15,
        marginHorizontal:-15,
        paddingHorizontal:15
    },
    AddressCardimage:{
        height: 40, 
        width: 40,
        backgroundColor:COLORS.background,
        borderRadius:8, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    TextInput:{
        ...FONTS.fontRegular,
        fontSize: 15,
        color: COLORS.title,
        borderRadius:8,
        paddingHorizontal: 15,
        borderWidth:1,
        borderColor:COLORS.inputborder,
        paddingBottom:50,
    },
    BottomCard:{
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingBottom:15,
        marginTop:5
    },
    CardTitle:{
        ...FONTS.fontMedium,
        fontSize:16,
        color:COLORS.title
    },
    CardTitle2:{
        ...FONTS.fontRegular,
         fontSize: 14, 
         color: COLORS.title
    },
    BottomTitle:{
        borderTopWidth:1,
        borderTopColor:COLORS.background,
        marginHorizontal:-15,
        paddingHorizontal:15,
        paddingTop:15,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
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

export default Checkout