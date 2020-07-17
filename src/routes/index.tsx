import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { useLocale } from '../hooks/locale';

import PhoneRoutes from './phones.routes';
import InterestedRoutes from './interested.routes';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const PhonesRoutes: React.FC = () => {
  const { trans } = useLocale();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#ccc',
        keyboardHidesTabBar: true,
        style: {
          borderTopColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Phones"
        component={PhoneRoutes}
        options={{
          title: trans('tabs.numbers'),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="list" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Interested"
        component={InterestedRoutes}
        options={{
          title: trans('tabs.interested'),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="users" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: trans('tabs.settings'),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="settings" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default PhonesRoutes;
