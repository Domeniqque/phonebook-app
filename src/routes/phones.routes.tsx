import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Phones from '../pages/Phones';
import CreatePhone from '../pages/Phones/Create';
import ShowPhone from '../pages/Phones/Show';

export type PhoneStackProps = {
  Phones: undefined;
  CreatePhone: undefined;
  ShowPhone: { id: string };
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
        name="Phones"
        component={Phones}
        options={{
          title: 'Números',
        }}
      />

      <Stack.Screen
        name="CreatePhone"
        component={CreatePhone}
        options={{ title: 'Adicionar sequência' }}
      />

      <Stack.Screen
        name="ShowPhone"
        component={ShowPhone}
        options={{ title: 'Atualizar' }}
      />
    </Stack.Navigator>
  );
};

export default PhonesRoutes;
