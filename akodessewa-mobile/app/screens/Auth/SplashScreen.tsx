import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { COLORS, FONTS } from '../../constants/theme';
import { useAppDispatch } from '../../redux/store';
import { restoreSession } from '../../redux/slices/authSlice';

const { width, height } = Dimensions.get('screen');

type SplashScreenProps = StackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const dispatch = useAppDispatch();
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo fade in + scale
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Title slide up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Red line expand
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      // Subtitle
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(800),
    ]).start(async () => {
      try {
        const result = await dispatch(restoreSession()).unwrap();
        if (result) {
          navigation.replace('DrawerNavigation');
        } else {
          navigation.replace('ChooseLanguage');
        }
      } catch {
        navigation.replace('ChooseLanguage');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Background gradient effect */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      {/* Logo area */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <Text style={styles.logoText}>A</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          }}
        >
          <Text style={styles.brandName}>AKODESSEWA</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.lineContainer,
            {
              width: lineWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 120],
              }),
            },
          ]}
        >
          <View style={styles.line} />
        </Animated.View>

        <Animated.View style={{ opacity: subtitleOpacity }}>
          <Text style={styles.tagline}>AUTO PARTS & SERVICES</Text>
          <Text style={styles.subTagline}>
            Pièces détachées • Motos • Garages
          </Text>
        </Animated.View>
      </View>

      {/* Bottom branding */}
      <Animated.View style={[styles.bottomArea, { opacity: subtitleOpacity }]}>
        <View style={styles.poweredRow}>
          <View style={styles.poweredDot} />
          <Text style={styles.poweredText}>Powered by AutoCore</Text>
          <View style={styles.poweredDot} />
        </View>
        <Text style={styles.versionText}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  circle1: {
    width: width * 1.2,
    height: width * 1.2,
    top: -width * 0.3,
    left: -width * 0.1,
  },
  circle2: {
    width: width * 0.8,
    height: width * 0.8,
    bottom: -width * 0.2,
    right: -width * 0.2,
  },
  circle3: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.15,
    right: -width * 0.15,
    borderColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    color: COLORS.primary,
    fontFamily: 'Jost-Bold',
    marginTop: -2,
  },
  brandName: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Jost-Bold',
    letterSpacing: 6,
    textAlign: 'center',
  },
  lineContainer: {
    height: 3,
    marginVertical: 14,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Jost-SemiBold',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 6,
  },
  subTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: 'Jost-Regular',
    letterSpacing: 1,
    textAlign: 'center',
  },
  bottomArea: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  poweredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  poweredDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  poweredText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Jost-Regular',
    letterSpacing: 1,
  },
  versionText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'Jost-Regular',
    marginTop: 4,
  },
});

export default SplashScreen;
