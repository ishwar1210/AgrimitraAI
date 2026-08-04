import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FarmerDashboardScreen } from '../screens/farmer/FarmerDashboardScreen';
import { PlaceholderScreen } from '../screens/dashboard/PlaceholderScreen';
import { CustomBottomTab, TabType } from '../components/common/CustomBottomTab';

export type MainTabParamList = {
  Home: undefined;
  Farms: undefined;
  Scan: undefined;
  Schedule: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const FarmsScreen = () => <PlaceholderScreen title="My Farms" icon="🌱" />;
const ScanScreen = () => <PlaceholderScreen title="Crop Disease Scanner" icon="🔍" />;
const ScheduleScreen = () => <PlaceholderScreen title="Farming Schedule" icon="📅" />;

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state }) => {
        const routeNameMap: Record<number, TabType> = {
          0: 'home',
          1: 'farms',
          2: 'scan',
          3: 'schedule',
        };

        const activeTab = routeNameMap[state.index] || 'home';

        const handleTabChange = (tab: TabType) => {
          switch (tab) {
            case 'home':
              navigation.navigate('Home');
              break;
            case 'farms':
              navigation.navigate('Farms');
              break;
            case 'scan':
              navigation.navigate('Scan');
              break;
            case 'schedule':
              navigation.navigate('Schedule');
              break;
          }
        };

        return (
          <CustomBottomTab
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      }}
    >
      <Tab.Screen name="Home" component={FarmerDashboardScreen} />
      <Tab.Screen name="Farms" component={FarmsScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
    </Tab.Navigator>
  );
};
