import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// import Person from '../pages/Person';

import PersonRoutes from './phones.routes';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const PhonesRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#ccc',
        style: {
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Phones"
        component={PersonRoutes}
        options={{
          title: 'NÚMEROS',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="list" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'AJUSTES',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="settings" size={size} color={color} />;
          },
        }}
      />

      {/* <Tab.Screen
        name="Person"
        component={Person}
        options={{
          title: 'INTERESSADOS',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="users" size={size} color={color} />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default PhonesRoutes;
