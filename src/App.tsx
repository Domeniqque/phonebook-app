import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';
import {
  StatusBar,
  Platform,
  UIManager,
  View,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

import Routes from './routes';
import AppProvider from './hooks';
import { startI18nLaguage } from './locale';

import './exception';

enableScreens();

async function bootstrapFirebase(): Promise<void> {
  await inAppMessaging().setMessagesDisplaySuppressed(true);

  crashlytics().setCrashlyticsCollectionEnabled(true);
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const deepLinkConfig: LinkingOptions = {
  prefixes: ['ppreach://'],
  config: {
    Phones: 'phones/:shareApp', // call "ppreach://phones/phones?shareApp=true"
  },
};

const App: React.FC = () => {
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    async function bootstrapApp(): Promise<void> {
      crashlytics().log('Starting application');
      await bootstrapFirebase();
      const lang = await startI18nLaguage();

      crashlytics().log(`App mounted. Language: "${lang}"`);

      setStarting(false);
      SplashScreen.hide();

      inAppMessaging().setMessagesDisplaySuppressed(false);
    }

    bootstrapApp();
  }, []);

  if (starting) return <View />;

  return (
    <NavigationContainer
      linking={deepLinkConfig}
      fallback={<Text>loading...</Text>}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
