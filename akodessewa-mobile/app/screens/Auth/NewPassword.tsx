import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, StyleSheet, } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/RootStackParamList'
import { IMAGES } from '../../constants/Images'
import Button from '../../components/Button/Button'
import OTPInput from '../../components/Input/OTPInput'
import Input from '../../components/Input/Input'

type NewPasswordScreenProps = StackScreenProps<RootStackParamList, 'NewPassword'>;

const NewPassword = ({navigation} : NewPasswordScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors : any} = theme;

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);

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
                  style={{height:25,resizeMode:'contain',flex:1}}
                  source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
                />
            </View>
        </View>
        <View style={[GlobalStyleSheet.border,{flex:1,borderColor:colors.border}]}>
            <View style={[GlobalStyleSheet.container,{flexGrow:1,marginTop:5}]}>
                <ScrollView>
                    <Text style={[FONTS.fontMedium,{fontSize:20,color:colors.title,}]}>Enter New Password</Text>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.text}]}>Your new password must be different from previously used password.</Text>
                    <View style={{ marginBottom: 10,paddingTop:20}}>
                        <Text style={[styles.title1,{color:colors.title}]}>Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            isFocused={isFocused}
                            type={'password'}
                        />
                    </View>
                    <View style={{ marginBottom: 10}}>
                        <Text style={[styles.title1,{color:colors.title}]}>Confirm Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <Input
                            backround={colors.card}
                            onChangeText={(value) => console.log(value)}
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            isFocused={isFocused2}
                            type={'password'}
                        />
                    </View>
                </ScrollView>
                <View style={{}}>
                  <Button
                    title={"Continue"}
                    onPress={() => navigation.navigate('SingIn')}
                  />
                </View>
                <View style={[GlobalStyleSheet.bottombtn]}>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Back To</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SingIn')}>
                        <Text style={styles.title2}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title1:{
        ...FONTS.fontMedium,
         fontSize: 14,
        color: COLORS.title,
        marginBottom:5
    },
    title2:{
        ...FONTS.fontRegular,
        fontSize:15,
        color:COLORS.primary,
        textDecorationLine:'underline',
        textDecorationColor:COLORS.primary
    },
})

export default NewPassword