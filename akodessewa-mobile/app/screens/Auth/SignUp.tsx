import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import Input from '../../components/Input/Input'
import { IMAGES } from '../../constants/Images'
import Button from '../../components/Button/Button'
import SelectCountery from '../../components/SelectCountery'
import { Checkbox } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { register } from '../../redux/slices/authSlice'

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation} : SignUpScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors : any} = theme;
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setisChecked] = useState(false);

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);
    const [isFocused4 , setisFocused4] = useState(false);

    const handleSignUp = async () => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
            return;
        }
        if (!isChecked) {
            Alert.alert('Erreur', 'Veuillez accepter les conditions');
            return;
        }
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || undefined;
        try {
            await dispatch(register({ email: email.trim(), password, firstName, lastName, phone: phone.trim() || undefined })).unwrap();
            navigation.replace('DrawerNavigation', { screen: 'Home' });
        } catch (err: any) {
            Alert.alert('Erreur', typeof err === 'string' ? err : "Échec de l'inscription");
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
                        <Text style={[styles.title1,{color: colors.title }]}>Créer votre compte</Text>
                        <Text style={[styles.title2,{ color: colors.text }]}>Bienvenue ! Entrez vos informations</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 20,width:'100%'}}>
                        <Text style={[styles.title3,{ color: colors.title}]}>Numéro de téléphone</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                            <View style={{}}>
                                <SelectCountery/>
                            </View>
                            <View style={{flex:1}}>
                                <Input
                                    backround={colors.card}
                                    onChangeText={(value) => setPhone(value)}
                                    keyboardType='number-pad'
                                    onFocus={() => setisFocused(true)}
                                    onBlur={() => setisFocused(false)}
                                    isFocused={isFocused}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10,}}>
                        <Text style={[styles.title3,{ color: colors.title}]}>Adresse email<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => setEmail(value)}
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            isFocused={isFocused2}
                        />
                    </View>
                    <View style={{ marginBottom: 10,}}>
                        <Text style={[styles.title3,{ color: colors.title}]}>Nom complet<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => setName(value)}
                            onFocus={() => setisFocused3(true)}
                            onBlur={() => setisFocused3(false)}
                            isFocused={isFocused3}
                        />
                    </View>
                    <View style={{ }}>
                    <Text style={[styles.title3,{ color: colors.title}]}>Mot de passe<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={() => setisFocused4(true)}
                            onBlur={() => setisFocused4(false)}
                            isFocused={isFocused4}
                            type={'password'}
                        />
                    </View>
                    <View>
                        <Checkbox.Item
                            onPress={() => setisChecked(!isChecked)}
                            position='leading'
                            label="J'accepte les conditions, la politique de confidentialité et les frais"
                            color={colors.title}
                            uncheckedColor={colors.textLight}
                            status={isChecked ? "checked" : "unchecked"}
                            style={{
                                paddingHorizontal: 0,
                                paddingVertical: 5,
                            }}
                            labelStyle={{
                                ...FONTS.fontRegular,
                                fontSize: 14,
                                color: colors.title,
                                textAlign: 'left',
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={{}}>
                  <Button
                    title={isLoading ? "Inscription..." : "S'inscrire"}
                    onPress={handleSignUp}
                  />
                </View>
                <View style={[GlobalStyleSheet.flex,{justifyContent:'center',gap:5,marginTop:10}]}>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Déjà un compte ?</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SingIn')}>
                        <Text style={styles.title4}>Se connecter</Text>
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

export default SignUp