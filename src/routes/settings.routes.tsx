import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

import Settings from '../pages/Settings';
import Backup from '../pages/Settings/Backup';

import { useLocale } from '../hooks/locale';

const Stack = createStackNavigator();

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
        name="Index"
        component={Settings}
        options={{
          title: trans('settings.title'),
        }}
      />

      <Stack.Screen
        name="Backup"
        component={Backup}
        options={{
          title: 'Backup',
        }}
      />
    </Stack.Navigator>
  );
};

export default InterestedRoutes;
