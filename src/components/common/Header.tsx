import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../constants/theme';

interface HeaderProps {
  onNotificationPress?: () => void;
  hasUnreadNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationPress,
  hasUnreadNotification = true,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Logo Image */}
        <Image
          source={require('../../assets/images/Logoname.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Notification Icon */}
        <TouchableOpacity
          style={styles.notificationBtn}
          activeOpacity={0.7}
          onPress={onNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color="#0F7038" />
          {hasUnreadNotification && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F4F8F4',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: '#F4F8F4',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  logo: {
    width: 190,
    height: 48,
  },
  notificationBtn: {
    position: 'relative',
    padding: SPACING.xs,
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
    borderColor: '#F4F8F4',
  },
});
