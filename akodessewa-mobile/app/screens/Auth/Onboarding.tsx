import React, { useRef, useState } from 'react';
import { Text, View,Image,  ScrollView,Animated, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS,FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import FeatherIcon from 'react-native-vector-icons/Feather';



type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({navigation} : OnboardingScreenProps) => {

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

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
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={[GlobalStyleSheet.border,{flexGrow:1,borderColor:colors.border}]}>
                <View style={[GlobalStyleSheet.container,{marginTop:15}]}>
                    <View>
                        <View
                            style={{
                                marginHorizontal:40,
                                marginTop:80
                            }}
                        >
                            <Image
                                style={styles.image1}
                                source={IMAGES.onborder1}
                            />
                        </View>
                        <Image
                            style={styles.image2}
                            source={IMAGES.onborder2}
                        />
                    </View>
                    <View style={{marginTop:20,flex:1}}>
                        <Text style={[styles.title1,{color:colors.title,}]}>Discovering The World Of Everything</Text>
                        <Text style={[styles.title2,{color:colors.text,}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>
                </View>
            </View>
            <View style={[GlobalStyleSheet.container,{padding:0,paddingHorizontal:15,paddingBottom:15}]}>
                <View style={{marginBottom:10,}}>
                    <Button
                        title={"Already a customer? Sign In"}
                        onPress={() => navigation.navigate('SingIn')}
                    />
                </View>
                <View style={{marginBottom:10}}>
                    <Button
                        title={"Create an account"}
                        onPress={() => navigation.navigate('SignUp')}
                        color={colors.title}
                        text={theme.dark ?COLORS.title : COLORS.card}
                    />
                </View>
                <View style={{}}>
                    <Button
                        title={"Skip sign in"}
                        onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                        color={colors.border}
                        text={colors.title}
                    />
                </View>
            </View>
        </ScrollView>
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
        fontSize:28,
        textAlign:'center',
        color:COLORS.title,
        paddingHorizontal:30
    },
    title2:{
        ...FONTS.fontRegular,
        fontSize:16,
        textAlign:'center',
        color:COLORS.text,
        paddingHorizontal:25,
        marginTop:5
    }

})

export default Onboarding