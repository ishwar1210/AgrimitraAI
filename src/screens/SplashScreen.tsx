import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { Path, Mask, Rect, Circle, Defs } from 'react-native-svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadStoredAuth } from '../store/slices/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ASSETS = [
  require('../assets/images/slpshscreen asset1.png'),
  require('../assets/images/slpshscreen asset2.png'),
  require('../assets/images/slpshscreen asset3.png'),
  require('../assets/images/slpshscreen asset4.png'),
  require('../assets/images/slpshscreen asset5.png'),
];

// Create animated SVG components
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const ICON_SIZE = SCREEN_WIDTH * 0.15;
const W = SCREEN_WIDTH * 0.9;
const H = SCREEN_WIDTH * 0.35;
const R = ICON_SIZE / 2;

const P1_y = H - R;
const P3_y = -0.05 * H + R;
const ctrlY = 2 * P3_y - P1_y; 

const getPoint = (t: number) => {
  const x = R + t * (W - 2 * R);
  const y = Math.pow(1 - t, 2) * P1_y + 2 * (1 - t) * t * ctrlY + Math.pow(t, 2) * P1_y;
  return { x, y };
};

const pos0 = getPoint(0);
const pos1 = getPoint(0.25);
const pos2 = getPoint(0.5);
const pos3 = getPoint(0.75);
const pos4 = getPoint(1);

const assetStyles = [
  { left: pos0.x - R, top: pos0.y - R },
  { left: pos1.x - R, top: pos1.y - R },
  { left: pos2.x - R, top: pos2.y - R },
  { left: pos3.x - R, top: pos3.y - R },
  { left: pos4.x - R, top: pos4.y - R },
];

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const animValues = useRef(ASSETS.map(() => new Animated.Value(0))).current;
  const lineWidthAnim = useRef(new Animated.Value(0)).current;
  const [animDone, setAnimDone] = React.useState(false);

  // Load stored auth on mount
  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  // Run animations exactly once on mount
  useEffect(() => {
    Animated.timing(lineWidthAnim, {
      toValue: W,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    const animations = animValues.map((anim) =>
      Animated.spring(anim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      })
    );

    Animated.stagger(300, animations).start(() => {
      setAnimDone(true); // triggers re-render → navigation useEffect runs
    });
  }, []); // Empty deps — run only once

  // Navigate when BOTH animation is done AND auth is resolved
  useEffect(() => {
    if (animDone && !isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          navigation.replace('Home');
        } else {
          navigation.replace('Welcome');
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [animDone, isLoading, isAuthenticated, navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/Mobile Splash.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* Rainbow Arc Container */}
          <View style={styles.arcContainer}>
            {/* Dotted Curve with Dynamic Mask */}
            <View style={StyleSheet.absoluteFill}>
              <Svg width="100%" height="100%">
                <Defs>
                  <Mask id="dynamicMask">
                    {/* The growing white rectangle reveals the line over time */}
                    <AnimatedRect x="0" y="0" height="100%" width={lineWidthAnim as any} fill="white" />
                    
                    {/* The black circles punch holes to hide the line exactly under the PNG icons */}
                    {/* Radius is slightly smaller (R * 0.8) in case PNGs have internal padding, ensuring line reaches them */}
                    <Circle cx={pos0.x} cy={pos0.y} r={R * 0.85} fill="black" />
                    <Circle cx={pos1.x} cy={pos1.y} r={R * 0.85} fill="black" />
                    <Circle cx={pos2.x} cy={pos2.y} r={R * 0.85} fill="black" />
                    <Circle cx={pos3.x} cy={pos3.y} r={R * 0.85} fill="black" />
                    <Circle cx={pos4.x} cy={pos4.y} r={R * 0.85} fill="black" />
                  </Mask>
                </Defs>
                
                <Path
                  d={`M ${pos0.x} ${pos0.y} Q ${W/2} ${ctrlY} ${pos4.x} ${pos4.y}`}
                  stroke="#9CCC65" /* Light vibrant green that looks great on natural backgrounds */
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1, 10" /* Creates a dotted line rather than dashed */
                  fill="none"
                  mask="url(#dynamicMask)"
                />
              </Svg>
            </View>

            {/* Arc Icons */}
            {ASSETS.map((asset, index) => {
              const anim = animValues[index];
              const scale = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              });
              
              const staticStyle = assetStyles[index];
              
              return (
                <Animated.Image
                  key={index}
                  source={asset}
                  style={[
                    styles.arcIcon,
                    {
                      left: staticStyle.left,
                      top: staticStyle.top,
                      opacity: anim,
                      transform: [{ scale }],
                    },
                  ]}
                  resizeMode="contain"
                />
              );
            })}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -(SCREEN_HEIGHT * 0.30), // Shifted further up
    width: '100%',
  },
  logo: {
    width: SCREEN_WIDTH * 0.7,
    height: 180,
    marginBottom: 40, // space before rainbow
  },
  arcContainer: {
    width: W,
    height: H, // Arc proportion
    position: 'relative',
  },
  arcIcon: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
