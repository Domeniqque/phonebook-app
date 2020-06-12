import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Phones from '../pages/Phones';

const Tab = createBottomTabNavigator();

const PhonesRoutes: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Phones" component={Phones} />
    </Tab.Navigator>
  );
};

export default PhonesRoutes;
