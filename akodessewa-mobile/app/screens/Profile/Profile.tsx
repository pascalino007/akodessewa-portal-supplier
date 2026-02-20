import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useRef } from 'react'
import { View, Text ,TouchableOpacity,Image,ScrollView, SectionList, StyleSheet} from 'react-native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IMAGES } from '../../constants/Images';
import { COLORS,FONTS, SIZES } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/actions/drawerAction';
import BottomSheet2 from '../Components/BottomSheet2';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../../redux/store';

const btnData = [
  {
      title: "Mes Commandes",
      navigate: 'Myorder',
  },
  {
      title: "Favoris",
      navigate: 'Wishlist',
  },
  {
      title: "Suivi Commande",
      navigate: 'TrackOrder',
  },
  {
      title: "Mon Panier",
      navigate: 'MyCart',
  },
]

const ListwithiconData = [
  {
      title: 'Paramètres du Compte',
      data: [
          {
              icon: IMAGES.user3,
              title: "Modifier le profil",
              navigate: 'EditProfile'
          },
          {
              icon: IMAGES.card2,
              title: "Cartes & Paiement",
              navigate: 'Payment'
          },
          {
              icon: IMAGES.map,
              title: "Adresses de livraison",
              navigate: 'AddDeleveryAddress'
          },
          {
              icon: IMAGES.translation,
              title: "Langue & Devise",
              navigate: 'LanguageCurrency'
          },
          {
              icon: IMAGES.ball,
              title: "Notifications",
              navigate: 'Notification'
          },
      ],
  },
  {
      title: 'Mon Activité',
      data: [
          {
              icon: IMAGES.star,
              title: "Avis & Évaluations",
              navigate: 'Writereview'
          },
          {
              icon: IMAGES.chat,
              title: "Chat & Support",
              navigate: 'Chat'
          },
      ],
  },
  {
      title: 'Informations',
      data: [
          {
              icon: IMAGES.star,
              title: "À Propos d'Akodessewa",
              navigate: 'AboutUs'
          },
      ],
  },
];

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({navigation} : ProfileScreenProps) => {

  const theme = useTheme();
  const { colors } : {colors : any} = theme;
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const moresheet2 = useRef<any>(null);


  return (
      <View style={{backgroundColor:colors.background,flex:1}}>
        <LinearGradient colors={[COLORS.primary , COLORS.primaryDark]} style={{height:60,justifyContent:'center'}}>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:15,padding:0}]}>
                <View style={[GlobalStyleSheet.flex]}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => dispatch(openDrawer())}
                        style={[GlobalStyleSheet.background3,{backgroundColor:COLORS.card}]}
                    >
                        <Image
                            style={GlobalStyleSheet.image2}
                            source={IMAGES.grid6}
                        />
                    </TouchableOpacity>
                    <View>
                        <Image
                            style={{height:25,resizeMode:'contain'}}
                            source={IMAGES.appname}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => moresheet2.current.openSheet('notification')}
                        activeOpacity={0.5}
                        style={[GlobalStyleSheet.background3,{backgroundColor:COLORS.card}]}
                    >
                        <Image
                            style={GlobalStyleSheet.image2}
                            source={IMAGES.shoppingbag}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
        <View style={[GlobalStyleSheet.container,{paddingTop:20,backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card}]}> 
            <View style={styles.topbar}>
                <Image
                    style={styles.topbarimg}
                    source={IMAGES.small6}
                />
                <Text style={{ ...FONTS.fontMedium, fontSize: 18, color: colors.title }}>{isAuthenticated && user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur' : 'Invit\u00e9'}</Text>
            </View>
            <View style={GlobalStyleSheet.row}>
                {btnData.map((data:any,index) => {
                    return(
                        <View key={index} 
                            style={[GlobalStyleSheet.col50,{marginBottom:5,paddingHorizontal:2.5}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate(data.navigate)}
                            style={[styles.topbarbtn,{
                                backgroundColor:colors.card,
                            }]}
                            >
                                <Text style={[FONTS.fontMedium,{fontSize:16,color:colors.title}]}>{data.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
        <View style={[GlobalStyleSheet.container,{flex:1,paddingTop:0}]}>
            <View style={{ marginHorizontal: -15, marginTop: 0, flex: 1 }}>
                <SectionList
                    sections={ListwithiconData}
                    keyExtractor={(item:any, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => navigation.navigate(item.navigate)}
                            style={[styles.sectioncard,{
                                backgroundColor:theme.dark ? 'rgba(255,255,255,.1)':colors.card,
                            }]}
                        >
                            <View style={styles.sectionimg}>
                                <Image
                                    style={[GlobalStyleSheet.image2,{tintColor:colors.title}]}
                                    source={item.icon}
                                />
                            </View>
                            <Text style={{...FONTS.fontRegular,fontSize:15,color:colors.title,flex:1,}}>{item.title}</Text>
                            <FeatherIcon size={22} color={colors.title} name={'chevron-right'} />
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text 
                            style={[styles.sectionTitle,{
                                color: colors.title,
                                backgroundColor:theme.dark ? 'rgba(255,255,255,.1)' : COLORS.white,
                             }]}
                        >{title}</Text>
                    )}
                />
            </View>
        </View>
        <BottomSheet2
            ref={moresheet2}
        />
      </View>
  )
}

const styles = StyleSheet.create({
    topbar:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 20 
    },
    topbarimg:{
        height: 45,
        width: 45,
        borderRadius: 50
    },
    topbarbtn:{
        height:48,
        width:'100%',
        backgroundColor:COLORS.card,
        borderWidth:1,
        borderColor:COLORS.inputborder,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },
    sectioncard:{
        flexDirection: 'row',
        paddingHorizontal:15,
        height: 48,
        alignItems: 'center',
    },
    sectionimg:{
        height: 30,
        width: 30,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    sectionTitle:{
        ...FONTS.fontMedium,
         fontSize: 18,
        color: COLORS.title,
        paddingLeft: 20,
        paddingVertical:10,
        backgroundColor:COLORS.white,
        borderBottomWidth:1,
        borderBottomColor:COLORS.background,
        marginTop:8
    }
})

export default Profile