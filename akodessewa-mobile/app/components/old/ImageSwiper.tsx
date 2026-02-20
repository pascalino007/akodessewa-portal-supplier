import React, { useState } from 'react';
import { View, Image, useWindowDimensions,TouchableOpacity } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import Pagination from './Pagination';

const ImageSwiper = ({ data,pagination }) => {
  const [newData] = useState([
    { key: 'space-left' },
    ...data,
    { key: 'space-right' },
  ]);

  const { width } = useWindowDimensions();
  const SIZE = width * 0.6;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);

  const onScroll = (event) => {
      x.value = event.nativeEvent.contentOffset.x;
  };

  const navigation = useNavigation();

  const theme = useTheme();
  const {colors} = theme;

  
  return (
    <View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={SIZE}
        decelerationRate="fast"
        onScroll={onScroll}
      >
        {newData.map((item, index) => {

          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8]
              );
              return {
                transform: [
                  { scale },
                ],
              };
            });
            
            if (!item.image) {
              return <View style={{ width: SPACER}} key={index} />;
            }

          return (
            <View key={index} style={{ width: SIZE,alignItems:'center'}}>
              <Animated.View style={[style, {marginTop:110}]}>
                <TouchableOpacity
                  activeOpacity={.9}
                  onPress={() => navigation.navigate('ProductDetails')}
                  style={{ height:undefined, width:'100%',aspectRatio:.9/1, backgroundColor:colors.card, alignItems: 'center', justifyContent: 'center', borderRadius: 260,borderBottomLeftRadius:0,borderBottomRightRadius:0 }}
                >
                  <Image
                    style={{ height:undefined, width:'100%',aspectRatio:1/1.5,marginTop:-80 }}
                    source={item.image}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE}/>}
    </View>
  );
};

export default ImageSwiper;
