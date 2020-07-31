import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  StatusBar,
  Platform,
  UIManager,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import Routes from './routes';
import AppProvider from './hooks';
import { startI18nLaguage } from './locale';

import './exception';

crashlytics().setCrashlyticsCollectionEnabled(true);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = () => {
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    crashlytics().log('Starting application');

    async function loadLanguage(): Promise<void> {
      const lang = await startI18nLaguage();
      crashlytics().log(`App mounted. Language: "${lang}"`);

      SplashScreen.hide();
      setStarting(false);
    }

    loadLanguage();
  }, []);

  if (starting) return <View />;

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <AppProvider>
          <Routes />
        </AppProvider>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

export default App;
