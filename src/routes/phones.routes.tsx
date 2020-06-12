import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Phones from '../pages/Phones';
import CreatePhones from '../pages/Phones/Create';

const Stack = createStackNavigator();

const PhonesRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Phone"
        component={Phones}
        options={{ title: 'Números' }}
      />

      <Stack.Screen
        name="CreatePhones"
        component={CreatePhones}
        options={{ title: 'Adicionar Números' }}
      />
    </Stack.Navigator>
  );
};

export default PhonesRoutes;
