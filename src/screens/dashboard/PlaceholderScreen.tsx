import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';

interface PlaceholderScreenProps {
  title: string;
  icon: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, icon }) => {
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>This feature is coming soon to AgriMitra.</Text>
        </View>
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
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
