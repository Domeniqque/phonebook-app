import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';
import { CountryCode } from 'libphonenumber-js';

import Interested from '../pages/Interested';
import CreateInterested from '../pages/Interested/Create';
import ShowInterested from '../pages/Interested/Show';
import EditInterested from '../pages/Interested/Edit';

import { useLocale } from '../hooks/locale';

export type InterestedStackProps = {
  IndexInterested: undefined;
  CreateInterested: { nationalPhone?: string; countryCode?: CountryCode };
  ShowInterested: { id: string };
  EditInterested: { id: string };
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
        },
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="IndexInterested"
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
    </Stack.Navigator>
  );
};

export default InterestedRoutes;
