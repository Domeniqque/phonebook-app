import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

import Interested from '../pages/Interested';
import CreateInterested from '../pages/Interested/Create';
// import ShowPhone from '../pages/Phones/Show';

import { useLocale } from '../hooks/locale';

export type InterestedStackProps = {
  Interested: undefined;
  CreateInterested: undefined;
  // ShowInterested: { id: string };
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
          // height: 80,
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

      {/* <Stack.Screen
        name="ShowPhone"
        component={ShowPhone}
        options={{ title: trans('phones.show.title') }}
      /> */}
    </Stack.Navigator>
  );
};

export default InterestedRoutes;
