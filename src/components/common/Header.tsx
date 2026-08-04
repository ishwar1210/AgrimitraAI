import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface HeaderProps {
  onNotificationPress?: () => void;
  hasUnreadNotification?: boolean;
  onProfilePress?: () => void;
  locationText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationPress,
  hasUnreadNotification = true,
  onProfilePress,
  locationText = 'Sinnar, Nashik',
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Logo & Location Column */}
        <View style={styles.logoLocationContainer}>
          <Image
            source={require('../../assets/images/Logoname.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.locationWrapper}>
            <Ionicons name="location-sharp" size={13} color="#0F7038" />
            <Text style={styles.locationText}>{locationText}</Text>
          </View>
        </View>

        {/* Right Actions: Notification & Profile */}
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={24} color="#0F7038" />
            {hasUnreadNotification && <View style={styles.badge} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileBtn}
            activeOpacity={0.75}
            onPress={handleProfilePress}
          >
            <Image
              source={require('../../assets/images/Profileimage.png')}
              style={styles.profileAvatar}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#E2F1E4',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    height: 94,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: '#E2F1E4',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 112, 56, 0.12)',
  },
  logoLocationContainer: {
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 38,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    paddingLeft: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F7038',
    marginLeft: 3,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionBtn: {
    position: 'relative',
    padding: SPACING.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 19,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#0F7038',
    overflow: 'hidden',
    marginLeft: 4,
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#D92D20',
    borderWidth: 1.5,
    borderColor: '#E2F1E4',
  },
});
