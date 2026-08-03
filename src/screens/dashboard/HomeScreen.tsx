import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { CustomButton } from '../../components/buttons/CustomButton';
import { Header } from '../../components/common/Header';
import { CustomBottomTab, TabType } from '../../components/common/CustomBottomTab';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace('Login');
  };

  return (
    <View style={styles.screen}>
      <Header onNotificationPress={() => console.log('Notification pressed')} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome to AgriMitra! 🌾</Text>
          <Text style={styles.infoText}>Active Tab: {activeTab.toUpperCase()}</Text>
          <Text style={styles.infoText}>Logged in as: {user?.email}</Text>
          {user?.role && <Text style={styles.roleText}>Role: {user.role}</Text>}
        </View>

        <CustomButton
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  welcomeText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  roleText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  logoutBtn: {
    width: '100%',
  },
});
