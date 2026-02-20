import React, { useState } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { COLORS } from '../constants/theme';
import CardStyle1 from './Card/CardStyle1';
import { useNavigation } from '@react-navigation/native';
import Cardstyle2 from './Card/Cardstyle2';

const ImageSwper2 = ({data}) => {

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
    
    return (
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
            // const rotate = interpolate(
            //   x.value,
            //   [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            //   ['10deg', '0deg', '-10deg']
            //   );
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
                <Animated.View style={[style, { overflow: 'hidden' }]}>
                    <View style={{}}>
                        <CardStyle1
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            discount={item.discount}
                            onPress={() => navigation.navigate('ProductDetails')}
                            Cardstyle4
                        />
                       
                    </View>
                </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
    )
}

export default ImageSwper2