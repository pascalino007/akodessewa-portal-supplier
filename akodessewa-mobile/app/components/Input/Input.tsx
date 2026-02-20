import React, { useState } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    Text
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

type Props = {
    placeholder ?: string,
    value ?: string,
    defaultValue ?: string,
    onChangeText ?: (e:any) => void,
    onFocus ?: (e:any) => void,
    onBlur ?: (e:any) => void,
    type ?: string,
    numberOfLines ?: any,
    icon ?: any,
    inputSm ?: any,
    inputLg ?: any,
    inputRounded ?: any,
    style ?: any,
    multiline ?: boolean,
    backround ?: any,
    keyboardType?:any,
    inputBorder?:any,
    text?:any,
    isFocused?:any,
}

const Input = ({
    placeholder,
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    type,
    numberOfLines,
    multiline,
    icon,
    inputSm,
    inputLg,
    inputRounded,
    style,
    backround,
    inputBorder,
    text,
    keyboardType,
    isFocused
}: Props) => {

    const [showPass , setShowPass] = useState<boolean>(true);

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    return (
        <View>
            {icon &&
                <View
                    style={[{
                        position:'absolute',
                        height:'100%',
                        width:48,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRightWidth:1,
                        borderRightColor:COLORS.inputborder,
                        zIndex:9
                    },inputBorder && {
                        borderRightWidth:0,
                        width:25
                    }]}
                >
                    {icon}
                </View>
            }
            <TextInput
                style={[styles.input,{
                    backgroundColor:backround ? colors.card :colors.input,
                    //borderColor:colors.,
                    color: colors.title,
                    fontSize:backround ? 14 : 14,
                },numberOfLines && {
                    height : 'auto',
                    paddingVertical:14,
                    textAlignVertical:'top',
                },icon && {
                    paddingLeft:70,
                },inputRounded && {
                    borderRadius:45,
                },inputSm && {
                    height:40,
                },inputLg && {
                    height:60,
                },inputBorder && {
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    backgroundColor:theme.dark ? null : colors.card,
                    //paddingHorizontal:20
                   
                },style && {
                    ...style
                },isFocused && {
                    borderColor:COLORS.primary,
                    shadowColor:COLORS.primaryLight,
                    elevation:5,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }]}
                multiline={multiline ? multiline : false}
                secureTextEntry={type === 'password' ? showPass : false}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                onFocus={onFocus}
                keyboardType={keyboardType}
                onBlur={onBlur}
                numberOfLines={numberOfLines}
                placeholderTextColor={inputBorder ? COLORS.text :theme.dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)'}
            />
            {text &&
                <View style={{position:'absolute',top:12,left:35}}>
                    <Text style={[FONTS.fontRegular,{fontSize:16,color:colors.title}]}>{text}</Text>
                </View> 
            }
            {type === "password" &&
                <TouchableOpacity
                    style={[styles.passBtn,{height:backround ? 48 :48}]}
                    onPress={() => setShowPass(!showPass)}
                >
                    {/* <FeatherIcon size={18} color={colors.title} name={showPass ? 'eye-off' : 'eye'} /> */}
                    <FeatherIcon color={theme.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'} size={18} name={showPass ? 'eye-off' : 'eye'} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles= StyleSheet.create({
    input : {
        ...FONTS.fontRegular,
        fontSize:15,
        height : 48,
        backgroundColor:'rgba(255,255,255,0.03)',
        borderRadius:8,
        paddingHorizontal:15,
        //paddingLeft:0,
        paddingVertical:5,
        borderWidth:1,
        borderColor:COLORS.inputborder,
        color:COLORS.title,
    },
    passBtn : {
        position:'absolute',
        right:0,
        top:0,
        height:48,
        width:48,
        alignItems:'center',
        justifyContent:'center',
        opacity:.7,
    }
})

export default Input;