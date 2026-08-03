import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export type TabType = 'home' | 'farms' | 'scan' | 'schedule' | 'profile';

interface CustomBottomTabProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CustomBottomTab: React.FC<CustomBottomTabProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.floatingContainer}>
      <BlurView intensity={70} tint="light" style={styles.tabBar}>
        {/* 1. Home Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'home' && styles.activeTabItem,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabChange('home')}
        >
          <Ionicons
            name="home"
            size={22}
            color={activeTab === 'home' ? '#0F7038' : '#667085'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' && styles.activeTabLabel,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* 2. Farms Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'farms' && styles.activeTabItem,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabChange('farms')}
        >
          <MaterialCommunityIcons
            name="flower-outline"
            size={22}
            color={activeTab === 'farms' ? '#0F7038' : '#667085'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'farms' && styles.activeTabLabel,
            ]}
          >
            Farms
          </Text>
        </TouchableOpacity>

        {/* 3. Scan Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'scan' && styles.activeTabItem,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabChange('scan')}
        >
          <MaterialCommunityIcons
            name="crop-free"
            size={22}
            color={activeTab === 'scan' ? '#0F7038' : '#667085'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'scan' && styles.activeTabLabel,
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>

        {/* 4. Schedule Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'schedule' && styles.activeTabItem,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabChange('schedule')}
        >
          <Ionicons
            name="calendar-outline"
            size={22}
            color={activeTab === 'schedule' ? '#0F7038' : '#667085'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'schedule' && styles.activeTabLabel,
            ]}
          >
            Schedule
          </Text>
        </TouchableOpacity>

        {/* 5. Profile Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'profile' && styles.activeTabItem,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabChange('profile')}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={activeTab === 'profile' ? '#0F7038' : '#667085'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'profile' && styles.activeTabLabel,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    borderRadius: 36,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 66,
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Liquid glass semi-transparent backdrop
    borderRadius: 36,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)', // Glossy liquid highlight rim
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTabItem: {
    backgroundColor: '#8DF5A3', // Vibrant light green active pill
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    elevation: 2,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475467',
    marginTop: 2,
  },
  activeTabLabel: {
    fontWeight: '700',
    color: '#0F7038',
  },
});
