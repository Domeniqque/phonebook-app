import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

import Interested from '../pages/Interested';
import CreateInterested from '../pages/Interested/Create';
<<<<<<< HEAD
import ShowInterested from '../pages/Interested/Show';
import EditInterested from '../pages/Interested/Edit';
=======
// import ShowPhone from '../pages/Phones/Show';
>>>>>>> cadastro de interessados

import { useLocale } from '../hooks/locale';

export type InterestedStackProps = {
  Interested: undefined;
  CreateInterested: undefined;
<<<<<<< HEAD
  ShowInterested: { id: string };
  EditInterested: { id: string };
=======
  // ShowInterested: { id: string };
>>>>>>> cadastro de interessados
};

const Stack = createStackNavigator<InterestedStackProps>();

const InterestedRoutes: React.FC = () => {
  const { trans } = useLocale();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitleVisible: false,
        gestureDirection: 'horizontal',
        headerBackImage: ({ tintColor }) => (
          <Icon
            name="arrow-left"
            size={35}
            color={tintColor}
            style={{ paddingLeft: 16 }}
          />
        ),
        headerStatusBarHeight: Platform.OS === 'ios' ? undefined : 10,
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
<<<<<<< HEAD
=======
          // height: 80,
>>>>>>> cadastro de interessados
        },
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        name="Interested"
        component={Interested}
        options={{
          title: trans('interested.title'),
        }}
      />

      <Stack.Screen
        name="CreateInterested"
        component={CreateInterested}
        options={{
          title: trans('interested.create.title'),
        }}
      />

<<<<<<< HEAD
      <Stack.Screen
        name="ShowInterested"
        component={ShowInterested}
        options={{ title: trans('interested.show.title') }}
      />

      <Stack.Screen
        name="EditInterested"
        component={EditInterested}
        options={{ title: trans('interested.edit.title') }}
      />
=======
      {/* <Stack.Screen
        name="ShowPhone"
        component={ShowPhone}
        options={{ title: trans('phones.show.title') }}
      /> */}
>>>>>>> cadastro de interessados
    </Stack.Navigator>
  );
};

export default InterestedRoutes;
