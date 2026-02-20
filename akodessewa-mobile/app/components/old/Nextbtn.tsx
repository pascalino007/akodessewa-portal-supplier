import React,{useRef,useState,useEffect} from 'react'
import { View, Text ,TouchableOpacity,Animated} from 'react-native'
import Svg, {G ,Circle}  from 'react-native-svg';
import { COLORS } from '../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from '@react-navigation/native';

// type Props = {
//     percentage: number;
//     scrollTo: any;
//     theme : any;
// };

const Nextbtn = ({percentage,scrollTo,} ) => {

    const theme = useTheme();
    const {colors} = theme;

    const size = 90 ;
    const strokeWidth = 2;
    const center = size /2 ;
    const radius = size /2 - strokeWidth / 2 ;

    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;

    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
                toValue,
                duration:250,
                useNativeDriver:true
        }).start()
    }

    useEffect(() => {
        animation(percentage);
    },[percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        });
        return () => {
            progressAnimation.removeAllListeners();
        }
    },[])

  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center} fill="none">

            <Circle stroke="rgba(80, 173, 152, 0.10)"  cx={center} cy={center} r={radius} strokeWidth={strokeWidth}
            />
            <Circle
                ref={progressRef}
                stroke={COLORS.primary} 
                cx={center} 
                cy={center} 
                r={radius} 
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * 60) /100}
            />
        </G>

      </Svg>
      <TouchableOpacity 
        onPress={scrollTo}
        activeOpacity={0.6} 
        style={{
          position:'absolute',
          backgroundColor:COLORS.primary,
          borderRadius:100,
          height:70,
          width:70,
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <FeatherIcon size={24} color={COLORS.white} name={'arrow-right'} />
      </TouchableOpacity>
    </View>
  )
}

export default Nextbtn