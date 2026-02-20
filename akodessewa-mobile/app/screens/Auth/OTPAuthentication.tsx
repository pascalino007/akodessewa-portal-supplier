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

type OTPAuthenticationScreenProps = StackScreenProps<RootStackParamList, 'OTPAuthentication'>;

const OTPAuthentication = ({navigation} : OTPAuthenticationScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors : any} = theme;

    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 6;

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
                    <Text style={[styles.title1,{color:colors.title,}]}>Please enter the OTP sent to</Text>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:COLORS.primary}]}>+91 897654123</Text>
                    <Text style={[styles.title3,{color:colors.title}]}>Enter OTP<Text style={{ color: '#FF0000' }}>*</Text></Text>
                    <View>
                        <View style={{marginBottom:10}}>
                           <OTPInput
                                code={otpCode}
                                setCode={setOTPCode}
                                maximumLength={maximumCodeLength}
                                setIsPinReady={setIsPinReady}
                           />
                           {/* <StatusBar barStyle={'light-content'}/> */}
                        </View> 
                    </View>
                    <Text style={[styles.title2,{color:colors.title}]}>If you don't receive code! <Text style={{color:COLORS.primary,textDecorationLine:'underline'}}>Resend</Text></Text>
                </ScrollView>
                <View style={{}}>
                  <Button
                    title={"Verify and proceed"}
                    onPress={() => navigation.navigate('EmailVerify')}
                  />
                </View>
                <View style={[GlobalStyleSheet.bottombtn]}>
                    <Text style={[FONTS.fontRegular,{fontSize:15,color:colors.title}]}>Back To</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SingIn')}>
                        <Text style={styles.title4}>Sign In</Text>
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
       fontSize: 18,
        color: COLORS.title,
         marginBottom: 5 
  },
  title2:{
      ...FONTS.fontRegular,
       fontSize: 14,
        color: COLORS.text 
  },
  title3:{
      ...FONTS.fontMedium,
       fontSize: 14,
      color: COLORS.title,
      marginBottom:-10,
      paddingTop:20
  },
  title4:{
      ...FONTS.fontRegular,
      fontSize:15,
      color:COLORS.primary,
      textDecorationLine:'underline',
      textDecorationColor:COLORS.primary
  },

})

export default OTPAuthentication