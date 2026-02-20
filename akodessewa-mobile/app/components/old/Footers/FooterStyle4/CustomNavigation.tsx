import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../../constants/theme';


const home  = require('../../../assets/images/icons/home.png');
const wallet  = require('../../../assets/images/icons/wallet.png');
const profile  = require('../../../assets/images/icons/profile.png');
const transfer  = require('../../../assets/images/icons/transfer.png');
const trade  = require('../../../assets/images/icons/trade.png');

type Props = {
    state ?: any;
    navigation ?: any;
    descriptors ?: any;
}

const CustomNavigation = ({state,navigation,descriptors}:Props) => {

    const {colors}: {colors : any} = useTheme();

    return (
        <>
            <View style={{
                height:65,
                flexDirection:'row',
                position:'absolute',
                left: 10,
                right : 10,
                bottom : 10,
                borderRadius: 12,
                backgroundColor: colors.card,
                shadowColor: "rgba(0,0,0,.6)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
            }}>
                
                {state.routes.map((route:any, index:any) => {

                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;
                    
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }

                    }

                    return(
                        <View style={styles.tabItem} key={index}>
                            <TouchableOpacity
                                style={styles.tabLink}
                                onPress={onPress}
                            >
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        resizeMode:'contain',
                                        marginBottom:4,
                                        opacity:isFocused ? 1 : .6,
                                        tintColor:isFocused ? COLORS.primary : colors.text,
                                    }}
                                    source={
                                        label === "Home" ? home :
                                        label === "Wallet" ? wallet:
                                        label === "Trade" ? trade:
                                        label === "Transfer" ? transfer :
                                        label === "Profile" && profile
                                    }
                                />
                                <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:isFocused ? colors.title : colors.text}}>{label}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </>
    );
};



const styles = StyleSheet.create({
    tabLink:{
        alignItems:'center',
    },
    tabItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    navText:{
        ...FONTS.fontSm,
    }
})


export default CustomNavigation;