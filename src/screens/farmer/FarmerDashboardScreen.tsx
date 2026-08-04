import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../../components/common/Header';
import { TractorSvgIcon, PlantSvgIcon } from '../../components/common/FarmerDashboardSvgIcons';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';

export const FarmerDashboardScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View style={styles.greetingHeader}>
          <Text style={styles.greetingTitle}>
            Hello, Ishwar <Text style={styles.handEmoji}>👋</Text>
          </Text>
          <Text style={styles.greetingSubtitle}>
            Here's your farm summary for today.
          </Text>
        </View>

        {/* Today's Weather Section */}
        <View style={styles.weatherSection}>
          <Text style={styles.weatherSectionTitle}>Today's Weather</Text>

          <View style={styles.weatherCard}>
            {/* Top Row: Weather Info & Icon */}
            <View style={styles.weatherMainRow}>
              {/* Blue Cloud Icon Box */}
              <View style={styles.weatherIconBox}>
                <Ionicons name="cloud" size={44} color="#FFFFFF" />
              </View>

              {/* Weather Main Info */}
              <View style={styles.weatherInfoContainer}>
                <View style={styles.locationRow}>
                  <Text style={styles.locationText}>Nashik, Maharashtra</Text>
                  <View style={styles.locationEditBadge}>
                    <MaterialCommunityIcons name="pencil" size={12} color="#0F7038" />
                  </View>
                </View>

                <Text style={styles.tempText}>26°C</Text>
                <Text style={styles.conditionText}>Drizzle</Text>
              </View>

              {/* Chevron Arrow */}
              <TouchableOpacity activeOpacity={0.7} style={styles.chevronBtn}>
                <Ionicons name="chevron-forward" size={24} color="#4A5568" />
              </TouchableOpacity>
            </View>

            {/* Middle Row: 4 Metric Pills */}
            <View style={styles.metricsRow}>
              {/* Pill 1: Low Temp */}
              <View style={styles.metricPill}>
                <Text style={styles.metricValue}>22°</Text>
                <Text style={styles.metricLabel}>Low</Text>
              </View>

              {/* Pill 2: High Temp */}
              <View style={styles.metricPill}>
                <Text style={styles.metricValue}>27°</Text>
                <Text style={styles.metricLabel}>High</Text>
              </View>

              {/* Pill 3: Rain Chance */}
              <View style={styles.metricPill}>
                <Text style={styles.metricValue}>100%</Text>
                <Text style={styles.metricLabel}>Rain chance</Text>
              </View>

              {/* Pill 4: Wind Speed */}
              <View style={styles.metricPill}>
                <Text style={styles.metricValue}>18</Text>
                <Text style={styles.metricLabel}>Wind speed</Text>
              </View>
            </View>

            {/* Bottom Row: Sunrise & Sunset */}
            <View style={styles.sunTimesRow}>
              <View style={styles.sunTimeItem}>
                <Feather name="sun" size={18} color="#D97706" />
                <Text style={styles.sunTimeText}>
                  Sunrise <Text style={styles.sunTimeVal}>6:11 AM</Text>
                </Text>
              </View>

              <View style={styles.sunTimeItem}>
                <Ionicons name="moon" size={18} color="#1D4ED8" />
                <Text style={styles.sunTimeText}>
                  Sunset <Text style={styles.sunTimeVal}>7:10 PM</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Metric Cards (2 Grid Cards) */}
        <View style={styles.cardsRow}>
          {/* Card 1: My Farms */}
          <TouchableOpacity style={styles.summaryCard} activeOpacity={0.85}>
            <View style={[styles.iconBadge, styles.darkGreenBadge]}>
              <TractorSvgIcon size={26} color="#FFFFFF" />
            </View>
            <Text style={styles.cardLabel}>My Farms</Text>
            <Text style={styles.cardCount}>3</Text>
          </TouchableOpacity>

          {/* Card 2: Active Crops */}
          <TouchableOpacity style={styles.summaryCard} activeOpacity={0.85}>
            <View style={[styles.iconBadge, styles.lightGreenBadge]}>
              <PlantSvgIcon size={26} color="#0F7038" />
            </View>
            <Text style={styles.cardLabel}>Active Crops</Text>
            <Text style={styles.cardCount}>5</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 110, // Space for floating bottom tab bar
  },
  greetingHeader: {
    marginBottom: SPACING.lg,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D211A',
    marginBottom: SPACING.xs,
  },
  handEmoji: {
    fontSize: 24,
  },
  greetingSubtitle: {
    fontSize: FONT_SIZE.md,
    color: '#556B61',
    lineHeight: 22,
  },
  /* Weather Section */
  weatherSection: {
    marginBottom: SPACING.xl,
  },
  weatherSectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0D211A',
    marginBottom: SPACING.md,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 112, 56, 0.06)',
  },
  weatherMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  weatherIconBox: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: '#3B9EFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    elevation: 2,
    shadowColor: '#3B9EFA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  weatherInfoContainer: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginRight: 6,
  },
  locationEditBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0D211A',
    lineHeight: 40,
  },
  conditionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B9EFA',
  },
  chevronBtn: {
    padding: SPACING.xs,
  },
  /* Metric Pills Row */
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    gap: 8,
  },
  metricPill: {
    flex: 1,
    backgroundColor: '#F8F6F0',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D211A',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  /* Sunrise & Sunset Row */
  sunTimesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
  sunTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sunTimeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  sunTimeVal: {
    fontWeight: '800',
    color: '#0D211A',
  },
  /* Summary Cards Row */
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 112, 56, 0.06)',
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  darkGreenBadge: {
    backgroundColor: '#0F7038',
  },
  lightGreenBadge: {
    backgroundColor: '#98F5AD',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2E26',
    marginBottom: SPACING.xs,
  },
  cardCount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F7038',
  },
});
