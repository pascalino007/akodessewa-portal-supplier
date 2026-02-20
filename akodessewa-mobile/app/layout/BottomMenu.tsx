import React, {useEffect, useRef, useState} from 'react';
import { 
    View, 
    Animated,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import { IMAGES } from '../constants/Images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropShadow from 'react-native-drop-shadow';
import { useSelector } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

type Props = {
    state : any,
    navigation : any,
    descriptors : any
}

const BottomMenu = ({state, navigation, descriptors}: Props) => {

    const cart = useSelector((state:any) => state.cart.cart);

    const theme = useTheme();
    const {colors} : {colors : any} = theme;
    
    const [tabWidth, setWidth] = useState(wp('100%'));

    const tabWD =
        tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

    const circlePosition = useRef(
        new Animated.Value(0),
    ).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });
    
    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    },[state.index,tabWidth])


    const onTabPress = (index:any) => {
        const tabW =
            tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5; // Adjust this according to your tab width

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };




    return (
        <View
            style={[{
                //backgroundColor: colors.card,
                shadowColor:theme.dark ? 'rgba(255,255,255,1)': 'rgba(0,0,0,1)',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
                //position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
            }, Platform.OS === 'ios' && {
                backgroundColor: colors.card,
                borderRadius:15
            }]}
        >
            <View
                style={[styles.tabBar,
                {
                    borderTopColor:colors.border,
                    backgroundColor:COLORS.card,
                }]}
            >
                <View
                    style={[GlobalStyleSheet.container,{
                        flexDirection: 'row',
                        paddingHorizontal: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }]}
                >

                    <Animated.View style={{transform: [{translateX: circlePosition}]}}>
                        <View
                            style={{
                                width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
                                position: 'absolute',
                                //backgroundColor:'red',
                                zIndex: 1,
                                top:10,
                                left: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <View
                                style={{
                                    height:65,
                                    width:65,
                                    borderRadius:0,
                                    backgroundColor:'rgba(0,0,0,.1)',
                                    position:'absolute',
                                }}
                            /> */}
                            <View
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:40,
                                    backgroundColor:COLORS.primary,
                                }}
                            />
                        </View>
                    </Animated.View>

                    {state.routes.map((route:any , index:string) => {

                        const {options} = descriptors[route.key];
                        const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                        const isFocused = state.index === index;

                        const iconTranslateY = useRef(new Animated.Value(0)).current;
                        Animated.timing(iconTranslateY, {
                            toValue: isFocused ? -18 : 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
            
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({name: route.name, merge: true});
                                onTabPress(index);
                            }
                        };

                        return(
                            <View
                                key={index}
                                style={styles.tabItem}
                            >   
                                <TouchableOpacity
                                    onPress={onPress}
                                    style={styles.tabLink}
                                >
                                    {/* <Animated.View
                                        style={{
                                            transform: [{translateY: iconTranslateY}],
                                    }}> */}
                                        <FeatherIcon
                                            name={
                                                label === 'Home'     ? 'home' :
                                                label === 'Wishlist' ? 'heart' :
                                                label === 'MyCart'   ? 'shopping-cart' :
                                                label === 'Category' ? 'grid' :
                                                label === 'Profile'  ? 'user' : 'home'
                                            }
                                            size={22}
                                            color={isFocused ? COLORS.white : colors.text}
                                        />
                                    {/* </Animated.View> */}
                                    {/* <Text style={[styles.navText,{color:isFocused ? COLORS.primary : colors.title}]}>{label}</Text> */}
                                    {label == 'MyCart' ? 
                                        <View style={[GlobalStyleSheet.notification, { position: 'absolute', right: -8, bottom: 12 }]}>
                                            <Text style={{ ...FONTS.fontRegular, fontSize: 10, color: COLORS.white }}>{cart.length}</Text>
                                        </View>
                                        : null
                                    }
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar : {
        height : 60,
        borderTopWidth:1,
    },
    tabItem : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        //paddingTop:10
    },
    tabLink : {
        alignItems: 'center',
        justifyContent:'center'
    },
    navText : {
        ...FONTS.fontRegular,
        fontSize:13
    }
});
 
export default BottomMenu;