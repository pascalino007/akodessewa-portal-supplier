import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet } from 'react-native'
import { COLORS ,FONTS,} from '../../constants/theme'
import { useTheme } from '@react-navigation/native'
import Button from '../../components/Button/Button'
import { IMAGES } from '../../constants/Images'
import { StackScreenProps } from '@react-navigation/stack'
import FeatherIcon from 'react-native-vector-icons/Feather';

import { RootStackParamList } from '../../navigation/RootStackParamList'
import { GlobalStyleSheet } from '../../constants/StyleSheet'

const selectData = [
  {
    image:IMAGES.flags1,
    title:"English",
    backgroundcolor:"#FCE6EA"
  },
  {
    image:IMAGES.flags2,
    title:"Hindi",
    backgroundcolor:"#FFF5E8"
  },
  {
    image:IMAGES.flags3,
    title:"French",
    backgroundcolor:"#E6EEF8"
  },
  {
    image:IMAGES.flags4,
    title:"Germany",
    backgroundcolor:"#FCE6E6"
  },
  {
    image:IMAGES.flags5,
    title:"Italian",
    backgroundcolor:"#E6F5ED"
  },
  {
    image:IMAGES.flags6,
    title:"Thai",
    backgroundcolor:"#E6E9F5"
  },
  {
    image:IMAGES.flags7,
    title:"Chinese",
    backgroundcolor:"#FCEAE8"
  },
  {
    image:IMAGES.flags8,
    title:"Urdu",
    backgroundcolor:"#E7EFE7"
  },
  {
    image:IMAGES.flags9,
    title:"Polish",
    backgroundcolor:"#FCE6EA"
  },
  {
    image:IMAGES.flags10,
    title:"Canadian",
    backgroundcolor:"#F9E7EB"
  },
  {
    image:IMAGES.flags11,
    title:"Danish",
    backgroundcolor:"#FAE7EB"
  },
  {
    image:IMAGES.flags12,
    title:"Japanese",
    backgroundcolor:"#FCE6E6"
  },
  {
    image:IMAGES.flags13,
    title:"Dutch",
    backgroundcolor:"#E9EDF4"
  },
  {
    image:IMAGES.flags14,
    title:"Turkish",
    backgroundcolor:"#FAE6E7"
  },
]

type ChooseLanguageScreenProps = StackScreenProps<RootStackParamList, 'ChooseLanguage'>;

const ChooseLanguage = ({navigation} : ChooseLanguageScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors : any} = theme;

  const [Select, setSelect] = useState(selectData[0]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor: colors.card,}}>
        <View style={[GlobalStyleSheet.container,{paddingVertical:20}]}>
            <View style={[GlobalStyleSheet.flexend]}>
                <Image
                  style={{height:25,resizeMode:'contain',flex:1}}
                  source={theme.dark ? IMAGES.appnamedark :IMAGES.appname}
                />
                <TouchableOpacity
                    style={{}}
                   onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                >
                    <Text style={[styles.text]}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[GlobalStyleSheet.border,{flex:1,borderColor:colors.border}]}>
            <View style={[GlobalStyleSheet.container,{flexGrow:1}]}>
                <View style={styles.marginHorizontal}>
                    <TextInput
                        placeholder='Find a language'
                        style={[GlobalStyleSheet.inputborder,styles.TextInput,{color:colors.title}]}
                        placeholderTextColor={colors.title}
                    />
                    <TouchableOpacity style={{position:'absolute',top:15,right:30}}>
                        <Image
                          style={[GlobalStyleSheet.image2,{tintColor:COLORS.primary}]}
                          source={IMAGES.search}
                        />
                    </TouchableOpacity>
                </View>
              <Text style={[styles.title,{color:colors.title}]}>Choose Your Language</Text>
              <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[GlobalStyleSheet.row,{marginTop:20}]}>
                    {selectData.map((data:any,index) => {
                        return(
                          <View style={[GlobalStyleSheet.col50, { marginBottom: 15 }]} key={index}>
                              <TouchableOpacity
                                onPress={() => setSelect(data)}
                                activeOpacity={0.5} 
                                style={[GlobalStyleSheet.flex,{
                                  height:45,
                                  width:'100%',
                                  borderRadius:6,
                                  paddingHorizontal:10,
                                  backgroundColor:data.backgroundcolor
                                }]}
                              >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                  <Image
                                    style={{height:22,width:28,borderRadius:6}}
                                    source={data.image}
                                  />
                                  <Text style={[FONTS.fontRegular,{fontSize:16,color:COLORS.title}]}>{data.title}</Text>
                                </View>
                                <View style={[GlobalStyleSheet.checkboximage,{backgroundColor:Select === data ? COLORS.primary:COLORS.card,}]}>
                                    <FeatherIcon size={14} color={Select === data ? COLORS.card : COLORS.title} name={'check'} />
                                </View>
                              </TouchableOpacity>
                          </View>
                        )
                    })}
                </View>
                <TouchableOpacity activeOpacity={0.9} style={{alignItems:'center',marginTop:5}}>
                  <Text style={[FONTS.fontRegular,{fontSize:16,color:COLORS.primary,textDecorationLine:'underline',textDecorationColor:COLORS.primary}]}>More Language</Text>
                </TouchableOpacity>
              </ScrollView>
              <View style={{}}>
                  <Button
                    title={"Continue in English"}
                    onPress={() => navigation.navigate('Onboarding')}
                  />
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
    title:{
      ...FONTS.fontMedium,
      fontSize:16,
      color:COLORS.title,
      marginTop:20
    },
    marginHorizontal:{
      marginHorizontal:-15,
      paddingHorizontal:15,
      marginVertical:5
    },
    TextInput:{
      ...FONTS.fontRegular,
      fontSize:18,
      color:COLORS.title
    }
})

export default ChooseLanguage;