import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import Input from '../../components/Input/Input'
import { IMAGES } from '../../constants/Images'
import Button from '../../components/Button/Button'
import SocialBtn from '../../components/Socials/SocialBtn'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { login, clearError } from '../../redux/slices/authSlice';

type SingInScreenProps = StackScreenProps<RootStackParamList, 'SingIn'>;

const SingIn = ({navigation} : SingInScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors : any} = theme;
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);

    const handleSignIn = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }
        try {
            await dispatch(login({ email: email.trim(), password })).unwrap();
            navigation.replace('DrawerNavigation', { screen: 'Home' });
        } catch (err: any) {
            Alert.alert('Erreur de connexion', typeof err === 'string' ? err : 'Identifiants incorrects');
        }
    };

  return (
    <SafeAreaView style={{flex:1,backgroundColor: colors.card,}}>
       <View style={[GlobalStyleSheet.container,{paddingVertical:20}]}>
            <View style={[GlobalStyleSheet.flex]}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={[GlobalStyleSheet.background2,{backgroundColor:colors.border}]}
                >
                        <FeatherIcon size={24} color={colors.title} name={'chevron-left'} />
                </TouchableOpacity>
                <Image
                  style={{height:25,resizeMode:'contain'}}
                  source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
                />
                <TouchableOpacity
                    style={{}}
                   onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                >
                    <Text style={styles.text}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[GlobalStyleSheet.border,{flex:1,borderColor:colors.border}]}>
            <View style={[GlobalStyleSheet.container,{flexGrow:1,marginTop:5}]}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={[styles.title1,{color:colors.title}]}>Connectez-vous</Text>
                        <Text style={[styles.title2, {color: colors.text }]}>Bon retour parmi nous !</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 20 }}>
                        <Text style={[styles.title3,{ color: colors.title,}]}>Email</Text>
                        <Input
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            backround={colors.card}
                            onChangeText={(value) => setEmail(value)}
                            isFocused={isFocused}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.title3,{ color: colors.title,}]}>Mot de passe</Text>
                        <Input
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            backround={colors.card}
                            onChangeText={(value) => setPassword(value)}
                            isFocused={isFocused2}
                            type={'password'}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('OTPAuthentication')}
                    >
                        <Text style={styles.text2}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{}}>
                  <Button
                    title={isLoading ? "Connexion..." : "Se connecter"}
                    onPress={handleSignIn}
                  />
                </View>
                <View style={{marginTop:10}}>
                    <SocialBtn
                        rounded
                        icon={<Image style={GlobalStyleSheet.image2} source={IMAGES.google2} />}
                        text={"Se connecter avec Google"}
                        color={theme.dark ? COLORS.title : COLORS.borderColor}
                    />
                </View>
                <View style={{marginTop:10}}>
                    <SocialBtn
                        rounded
                        icon={<FontAwesome name='apple' size={20} color={colors.title} />}
                        text={"Se connecter avec Apple"}
                        color={theme.dark ? COLORS.title : COLORS.borderColor}
                    />
                </View>
                <View style={[GlobalStyleSheet.bottombtn]}>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Pas encore membre ?</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.title4}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text:{
        ...FONTS.fontRegular,
        fontSize:16,
        color:COLORS.primary,
        textDecorationLine:'underline'
    },
    text2:{
        ...FONTS.fontRegular,
        fontSize:14,
        color:COLORS.primary,
        textDecorationLine:'underline',
        textAlign:'right',
        marginBottom:10
    },
    image1:{
        width:'100%',
        height:undefined,
        aspectRatio:1/1,
        borderRadius:20,
        zIndex:-1
    },
    image2:{
        width:'100%',
        height:undefined,
        aspectRatio:1/1.2,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        resizeMode:'contain'
    },
    title1:{
        ...FONTS.fontMedium,
         fontSize: 20,
          color: COLORS.title,
           marginBottom: 5 
    },
    title2:{
        ...FONTS.fontRegular,
         fontSize: 15,
          color: COLORS.text 
    },
    title3:{
        ...FONTS.fontMedium,
         fontSize: 14,
        color: COLORS.title,
        marginBottom:5
    },
    title4:{
        ...FONTS.fontRegular,
        fontSize:15,
        color:COLORS.primary,
        textDecorationLine:'underline',
        textDecorationColor:COLORS.primary
    },

})

export default SingIn