import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Animated,{
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { COLORS } from '../constants/theme';

const Pagination = ({data , x , size}) => {
  return (
    <View style={styles.paginationcontainer}>
        {data.map((_, i) => {

            const animatedDotStyle = useAnimatedStyle(() => {
                const widthAnimation = interpolate(
                    x.value,
                    [(i-1) * size ,i * size, (i+1) * size],
                    [6,6,6],
                    Extrapolate.CLAMP,
                );
                const opacityAnimation = interpolate(
                    x.value,
                    [(i-1) * size ,i * size, (i+1) * size],
                    [.4,1,.4],
                    Extrapolate.CLAMP,
                );
                return{
                    width: widthAnimation,
                    opacity:opacityAnimation
                };
            }); 
            return (
                <Animated.View style={[styles.dots, animatedDotStyle]} key={i}/>
            )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
    paginationcontainer:{
        flexDirection:'row',
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    dots: {
        height:6,
        width:6,
        backgroundColor:COLORS.primary,
        marginHorizontal:6,
        borderRadius:10,
    }
})
export default Pagination