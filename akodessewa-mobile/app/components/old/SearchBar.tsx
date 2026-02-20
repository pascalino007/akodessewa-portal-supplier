import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { SIZES } from '../constants/theme';
import DropShadow from 'react-native-drop-shadow';

const SearchBar = () => {

    const theme = useTheme();
    const { colors } = theme;

    return (
        <View
            style={{
                justifyContent:'center',
            }}
        >
            <DropShadow
                style={{
                    backgroundColor:colors.card,
                    shadowColor: 'rgb(18,9,46)',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }}
            >
                <TextInput
                    style={[styles.searchBar,{
                        borderColor:colors.borderColor,
                        backgroundColor:colors.card,
                        color:colors.title,
                    }]}
                    placeholder='Find Cars, Mobile Phone and more...'
                    placeholderTextColor={theme.dark ?'rgba(255,255,255,.6)':'rgba(18,9,46,.8)'}
                />
            </DropShadow>
            <FeatherIcon
                name={'search'}
                size={20}
                color={colors.title}
                style={{
                    position:'absolute',
                    left : 15,
                    opacity:.8,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar : {
        height:48,
        borderWidth:1,
        borderRadius:SIZES.radius,
        padding:15,
        paddingLeft:45,
    }
})

export default SearchBar;