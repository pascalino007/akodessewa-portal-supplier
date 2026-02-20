import React, { useState } from 'react'
import { View, Text,  ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';

import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateProfile } from '../../redux/slices/authSlice';

const EditProfile = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    const navigation = useNavigation<any>();
    const appDispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.auth);

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [lastName, setLastName] = useState(user?.lastName || '');

    const handleUpdate = async () => {
        try {
            await appDispatch(updateProfile({ firstName, lastName, phone })).unwrap();
            Alert.alert('Succès', 'Profil mis à jour');
            navigation.goBack();
        } catch (err: any) {
            Alert.alert('Erreur', typeof err === 'string' ? err : 'Échec de la mise à jour');
        }
    };

    return (
       <View style={{backgroundColor:colors.background,flex:1}}>
           <Header
                title='Edit Profile'
                leftIcon='back'
                titleLeft
           />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container, {backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
                        <View style={{}}>
                            <View style={styles.imageborder}>
                                <Image
                                    style={{ height: 82, width: 82, borderRadius: 50 }}
                                    source={IMAGES.small6}
                                />
                            </View>
                            <TouchableOpacity style={[styles.WriteIconBackground,{ backgroundColor: colors.card }]}>
                                <View style={styles.WriteIcon}>
                                    <Image
                                        style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: COLORS.card }}
                                        source={IMAGES.write}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={[FONTS.fontMedium,{fontSize:24,color:colors.title}]}>{user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur' : 'Invité'}</Text>
                            <Text style={[FONTS.fontMedium,{fontSize:13,color:colors.text}]}>{user?.email || ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,marginTop:5,paddingVertical:10}]}>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Text style={[styles.InputTitle,{color:colors.title}]}>Prénom</Text>
                        <Input
                            value={firstName}
                            onChangeText={(value: string) => setFirstName(value)}
                            backround={colors.card}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.InputTitle,{color:colors.title}]}>Nom</Text>
                        <Input
                            value={lastName}
                            onChangeText={(value: string) => setLastName(value)}
                            backround={colors.card}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.InputTitle,{color:colors.title}]}>Téléphone</Text>
                        <Input
                            value={phone}
                            onChangeText={(value: string) => setPhone(value)}
                            backround={colors.card}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.InputTitle,{color:colors.title}]}>Email</Text>
                        <Input
                            value={email}
                            onChangeText={(value: string) => setEmail(value)}
                            backround={colors.card}
                            editable={false}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,paddingBottom:0}]}>
                <View style={[styles.bottomBtn,{backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}>
                    <Button
                        title={isLoading ? 'Mise à jour...' : 'Mettre à jour'}
                        color={COLORS.primary}
                        text={ COLORS.title}
                        onPress={handleUpdate}
                    />
                </View>
            </View> 
       </View>
    )
}

const styles = StyleSheet.create({
    imageborder:{
        borderWidth: 2, 
        borderColor:COLORS.primary, 
        height: 90,
        width: 90, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    WriteIconBackground:{
        height: 42, 
        width: 42, 
        borderRadius: 40, 
        backgroundColor: COLORS.card, 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        bottom: 0, 
        left:60
    },
    WriteIcon:{
        height: 36, 
        width: 36, 
        borderRadius: 36, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:COLORS.primary 
    },
    InputTitle:{
        ...FONTS.fontMedium, 
        fontSize: 13, 
        color:COLORS.title,
        marginBottom:5
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


export default EditProfile