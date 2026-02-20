import React, { useState } from 'react';
import { Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';


const LikeBtn = ({heartwhite}) => {

    const [isLike, setIsLike] = useState(false);

    const theme = useTheme();

    return (
        <Pressable
            accessible={true}
            accessibilityLabel="Like Btn"
            accessibilityHint="Like this item"
            onPress={() => { setIsLike(!isLike) }}
            style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isLike ?
                <FontAwesome size={20} color={ COLORS.danger} name="heart" />
                :
                <FontAwesome size={20} color={heartwhite ? COLORS.white :theme.dark ? '#fff': '#CFDBD6'} name="heart" />
            }
        </Pressable>
    );
};


export default LikeBtn;