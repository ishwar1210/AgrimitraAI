import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_ASPECT_RATIO = 612 / 473; // Actual aspect ratio of 2nd screen image.jpg

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/2nd screen image.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Content Card */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Smart Farming{'\n'}Starts Here</Text>

        <Text style={styles.subtitle}>
          AI-driven insights, expert advice, and smart scheduling for better yields.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.createAccountBtnText}>Create Account</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF7',
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.50, // Reduced slightly to bring info card a bit up
    width: '100%',
    backgroundColor: '#95C4D8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F7FAF7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 0, // No overlap, sits perfectly below the image
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F291E',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: '#4B6358',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  loginBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#2E7D32', // Green button color
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  createAccountBtn: {
    width: '100%',
    height: 52,
    backgroundColor: 'transparent',
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  createAccountBtnText: {
    color: '#2E7D32',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  skipBtn: {
    paddingVertical: SPACING.xs,
  },
  skipBtnText: {
    fontSize: FONT_SIZE.sm,
    color: '#667085',
    fontWeight: '500',
  },
});
