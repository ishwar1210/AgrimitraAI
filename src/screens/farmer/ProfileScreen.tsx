import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (e) {
      // ignore errors during logout
    } finally {
      navigation.replace('Welcome');
    }
  };

  const PROFILE_DETAILS = [
    { label: 'Full Name', value: 'Ishwar Khairnar', icon: 'person-outline' },
    { label: 'Role', value: 'Farmer', icon: 'leaf-outline' },
    { label: 'Mobile Number', value: '+91 9404994710', icon: 'call-outline' },
    { label: 'Village', value: 'Sinnar', icon: 'home-outline' },
    { label: 'District', value: 'Nashik', icon: 'location-outline' },
    { label: 'State', value: 'Maharashtra', icon: 'map-outline' },
    { label: 'Pin Code', value: '422103', icon: 'mail-outline' },
  ];

  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <Text style={styles.pageTitle}>My Profile</Text>

        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/Profile-icon.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.profileName}>Ishwar Khairnar</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>🌾 Farmer Account</Text>
          </View>
        </View>

        {/* Profile Details List Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {PROFILE_DETAILS.map((item, index) => (
            <View
              key={index}
              style={[
                styles.detailRow,
                index === PROFILE_DETAILS.length - 1 && styles.lastDetailRow,
              ]}
            >
              <View style={styles.detailIconContainer}>
                <Ionicons name={item.icon as any} size={20} color="#0F7038" />
              </View>

              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.85}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#D92D20" />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5FAF5',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 110, // Space for bottom tab bar
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D211A',
    marginBottom: SPACING.lg,
  },
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 112, 56, 0.06)',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F5E9',
    marginBottom: SPACING.md,
    borderWidth: 3,
    borderColor: '#0F7038',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D211A',
    marginBottom: 6,
  },
  roleBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F7038',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 112, 56, 0.06)',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0D211A',
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F1',
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F9F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  detailTextWrapper: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#667085',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2E26',
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE4E2',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECDCA',
    elevation: 1,
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D92D20',
    marginLeft: SPACING.xs,
  },
});
