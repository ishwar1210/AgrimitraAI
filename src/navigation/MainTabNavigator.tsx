import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/dashboard/HomeScreen';
import { PlaceholderScreen } from '../screens/dashboard/PlaceholderScreen';
import { CustomBottomTab, TabType } from '../components/common/CustomBottomTab';

export type MainTabParamList = {
  Home: undefined;
  Farms: undefined;
  Scan: undefined;
  Schedule: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const FarmsScreen = () => <PlaceholderScreen title="My Farms" icon="🌱" />;
const ScanScreen = () => <PlaceholderScreen title="Crop Disease Scanner" icon="🔍" />;
const ScheduleScreen = () => <PlaceholderScreen title="Farming Schedule" icon="📅" />;
const ProfileScreen = () => <PlaceholderScreen title="Farmer Profile" icon="👤" />;

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
          4: 'profile',
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
            case 'profile':
              navigation.navigate('Profile');
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Farms" component={FarmsScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
