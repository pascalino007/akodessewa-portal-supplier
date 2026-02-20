import { useTheme } from '@react-navigation/native';
import React, { useMemo, useState } from 'react' 
import { View, Text ,ScrollView,Image,TouchableOpacity, StyleSheet} from 'react-native'
import { IMAGES } from '../../constants/Images';
import Header from '../../layout/Header';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useAppSelector } from '../../redux/store';

const saveData = [
    {
        image: IMAGES.Home4,
        title: "Home Address",
        text: "123 Main Street, Anytown, USA 12345",
    },
    {
        image: IMAGES.map,
        title: "Office Address",
        text: "456 Elm Avenue, Smallville, CA 98765",
    },
    {
        image: IMAGES.Home4,
        title: "Home Address",
        text: "789 Maple Lane, Suburbia, NY 54321",
    },
    {
        image: IMAGES.shop,
        title: "Shop Address",
        text: "654 Pine Road, Countryside, FL 34567",
    },
]

type DeleveryAddressScreenProps = StackScreenProps<RootStackParamList, 'DeleveryAddress'>;

const DeleveryAddress = ({navigation} : DeleveryAddressScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const { user } = useAppSelector((state) => state.auth);

    // Build address list from user profile or fallback
    const addressList = useMemo(() => {
        if (user?.addresses && user.addresses.length > 0) {
            return user.addresses.map((a: any) => ({
                image: a.type === 'OFFICE' ? IMAGES.map : IMAGES.Home4,
                title: a.label || (a.type === 'OFFICE' ? 'Bureau' : 'Domicile'),
                text: [a.street, a.city, a.state, a.country].filter(Boolean).join(', '),
                id: a.id,
            }));
        }
        return saveData;
    }, [user]);

    const [isChecked, setIsChecked] = useState(addressList[0]);

    return (
        <View style={{backgroundColor:colors.background,flex:1}}>
            <Header
                title='Adresse de livraison'
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
                        <Text style={styles.tracktitle2}>Panier</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.secondary,opacity:1}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.secondary}]}>
                            <Text style={styles.tracktitle}>2</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Adresse</Text>
                    </View>
                    <View style={[GlobalStyleSheet.outline,{backgroundColor:COLORS.card}]}/>
                    <View style={[GlobalStyleSheet.rowcenter]}>
                        <View style={[GlobalStyleSheet.countcricle,{backgroundColor:COLORS.card}]}>
                            <Text style={styles.tracktitle}>3</Text>
                        </View>
                        <Text style={styles.tracktitle2}>Paiement</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, { paddingTop:5,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' :colors.card,marginTop:10 }]}>
                    {addressList.map((data:any, index:any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setIsChecked(data)}
                                style={[styles.addresscard,{
                                    borderBottomColor:colors.background,
                                }]}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 ,flex:1}}>
                                    <View style={[styles.addressimage,{backgroundColor:colors.background}]}>
                                        <Image
                                            style={[GlobalStyleSheet.image2,{tintColor:colors.title}]}
                                            source={data.image}
                                        />
                                    </View>
                                    <View style={{flex:1}}> 
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.text }}>{data.text}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[{
                                        backgroundColor:COLORS.background,
                                        width: 24,
                                        height: 24,
                                        borderRadius: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },isChecked === data && {
                                        backgroundColor:COLORS.primary
                                    }]}
                                >
                                    <View style={[{
                                        width: 14,
                                        height: 14,
                                        backgroundColor:theme.dark ? colors.background : COLORS.card,
                                        borderRadius: 50
                                    }, isChecked === data && {
                                        backgroundColor: COLORS.card
                                    }]}></View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity
                        style={[styles.addAddress,{
                            backgroundColor:colors.background,
                        }]}
                        onPress={() => navigation.navigate('AddDeleveryAddress')}
                    >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image
                                style={[GlobalStyleSheet.image2,{ tintColor:COLORS.primary }]}
                                source={IMAGES.plus}
                            />
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>Ajouter une adresse</Text>
                        </View>
                        <FeatherIcon size={22} color={colors.title} name={'chevron-right'} />
                        {/* <Ionicons  color={colors.title} name='chevron-forward' size={20}/> */}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
                <View 
                    style={[styles.bottomBtn,{
                        backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                    }]}
                >
                    <Button
                        title='Continuer'
                        color={COLORS.primary}
                        text={ COLORS.title}
                        onPress={() => navigation.navigate('Payment')}
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
        borderBottomWidth: 1,
        borderBottomColor:COLORS.background,
        paddingBottom: 15,
        marginTop: 15
    },
    addressimage:{
        height: 40,
         width: 40,
         backgroundColor:COLORS.background,
         borderRadius:8,
          alignItems: 'center',
           justifyContent: 'center' 
    },
    addAddress:{
        height: 48,
        width: '100%',
        backgroundColor:COLORS.background,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 30
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

export default DeleveryAddress