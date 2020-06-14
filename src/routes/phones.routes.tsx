import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PhoneNumber } from '../hooks/phone';
import Phones from '../pages/Phones';
import CreatePhone from '../pages/Phones/Create';
import ShowPhone from '../pages/Phones/Show';

export type PhoneStackProps = {
  Phone: undefined;
  CreatePhone: undefined;
  ShowPhone: PhoneNumber;
};

const Stack = createStackNavigator<PhoneStackProps>();

const PhonesRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen
        name="Phone"
        component={Phones}
        options={{
          title: 'Números',
        }}
      />

      <Stack.Screen
        name="CreatePhone"
        component={CreatePhone}
        options={{ title: 'Adicionar Números' }}
      />

      <Stack.Screen
        name="ShowPhone"
        component={ShowPhone}
        options={{ title: 'Números' }}
      />
    </Stack.Navigator>
  );
};

export default PhonesRoutes;
