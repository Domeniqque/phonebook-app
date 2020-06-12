import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Phones from '../pages/Phones';
import Person from '../pages/Person';

const Tab = createBottomTabNavigator();

const PhonesRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen
        name="Phones"
        component={Phones}
        options={{
          title: 'Números',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="list" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Person"
        component={Person}
        options={{
          title: 'Interessados',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="users" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default PhonesRoutes;
