import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { COLORS, FONTS } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ThemeBtn from '../components/ThemeBtn';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../redux/actions/drawerAction';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const MenuItems = [
    {
        icon: IMAGES.home,
        name: "Accueil",
        navigate: "DrawerNavigation",
        feather: "home",
    },
    {
        icon: IMAGES.producta,
        name: "Pièces Auto",
        navigate: "VehicleSearch",
        feather: "search",
    },
    {
        icon: IMAGES.producta,
        name: "Pièces Moto",
        navigate: "MotoHome",
        feather: "zap",
    },
    {
        icon: IMAGES.producta,
        name: "Véhicules Occasion",
        navigate: "UsedVehicles",
        feather: "truck",
    },
    {
        icon: IMAGES.star,
        name: "Garages",
        navigate: "Garages",
        feather: "tool",
    },
    {
        icon: IMAGES.heart,
        name: "Favoris",
        navigate: "Wishlist",
        feather: "heart",
    },
    {
        icon: IMAGES.order,
        name: "Mes Commandes",
        navigate: 'Myorder',
        feather: "package",
    },
    {
        icon: IMAGES.shopping,
        name: "Mon Panier",
        navigate: 'MyCart',
        feather: "shopping-cart",
    },
    {
        icon: IMAGES.order,
        name: "Suivi de Commande",
        navigate: 'TrackOrder',
        feather: "map-pin",
    },
    {
        icon: IMAGES.producta,
        name: "Langue & Devise",
        navigate: 'LanguageCurrency',
        feather: "globe",
    },
    {
        icon: IMAGES.chat,
        name: "Chat",
        navigate: 'Chat',
        feather: "message-circle",
    },
    {
        icon: IMAGES.user3,
        name: "Profil",
        navigate: "Profile",
        feather: "user",
    },
    {
        icon: IMAGES.producta,
        name: "À Propos",
        navigate: "AboutUs",
        feather: "info",
    },
    {
        icon: IMAGES.logout,
        name: "Déconnexion",
        navigate: 'SingIn',
        feather: "log-out",
    },
]

const DrawerMenu = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const { colors } : {colors : any} = theme;

    const navigation = useNavigation<any>();

    const handleLogout = async () => {
        dispatch(closeDrawer());
        await appDispatch(logout());
        navigation.reset({ index: 0, routes: [{ name: 'SingIn' }] });
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View
                style={{
                    flex:1,
                    backgroundColor:theme.dark ? COLORS.title :colors.card,
                    paddingHorizontal:15,
                    paddingVertical:15,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderBottomColor:COLORS.background,
                        paddingBottom:20,
                        paddingTop:20,
                        marginHorizontal:-15,
                        paddingHorizontal:15
                    }}
                >
                    <Image
                        source={IMAGES.small6}
                        style={{
                            height:60,
                            width:60,
                            borderRadius:10,
                            marginRight:10,
                        }}
                    />
                    <View
                        style={{
                            flex:1,
                        }}
                    >
                        <Text style={[FONTS.fontSemiBold,{color:colors.title,fontSize:18}]}>{isAuthenticated && user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur' : 'Invité'}</Text>
                        <Text style={[FONTS.fontRegular,{color:COLORS.primary,fontSize:15}]}>{isAuthenticated && user ? user.email : 'Non connecté'}</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 10, top: 0 }}>
                        <ThemeBtn />
                    </View>
                </View>
                <View style={{flex:1,paddingVertical:15}}>
                    {MenuItems.map((data,index) => {
                        return(
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (data.name === 'Déconnexion') {
                                        handleLogout();
                                    } else if (data.navigate === 'DrawerNavigation') {
                                        dispatch(closeDrawer());
                                    } else {
                                        dispatch(closeDrawer());
                                        navigation.navigate(data.navigate);
                                    }
                                }}
                                key={index}
                                style={[GlobalStyleSheet.flex,{
                                   
                                    paddingVertical:5,
                                    marginBottom:0,
                                }]}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    <View style={{height:40,width:40,borderWidth:1,borderColor:COLORS.inputborder,borderRadius:8,alignItems:'center',justifyContent:'center',backgroundColor:theme.dark ? 'rgba(0,0,0,.1)':'#FAFDFF'}}>
                                        <Image
                                            source={data.icon}
                                            style={{
                                                height:18,
                                                width:18,
                                                tintColor:colors.title,
                                                //marginRight:14,
                                                resizeMode:'contain'
                                            }}
                                        />
                                    </View>
                                    <Text style={[FONTS.fontRegular,{color:colors.title,fontSize:16}]}>{data.name}</Text>
                                </View>
                                {/* <FeatherIcon size={20} color={colors.title} name={'chevron-right'} /> */}
                                <FeatherIcon size={18} color={colors.title} name='chevron-right' />
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View
                    style={{
                        paddingVertical:10,
                        borderTopWidth:1,
                        borderTopColor:COLORS.background,
                        marginHorizontal:-15,
                        paddingHorizontal:15,
                    }}
                >
                    <Text style={[FONTS.fontSemiBold,{color:colors.title,fontSize:13,}]}>Akodessewa <Text style={[FONTS.fontRegular]}>by AutoCore</Text></Text>
                    <Text style={[FONTS.fontRegular,{color:colors.title,fontSize:13}]}>App Version 1.0</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default DrawerMenu