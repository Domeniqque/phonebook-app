import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import Routes from './routes';
import AppProvider from './hooks';
import Loading from './components/Loading';

import { startI18nLaguage } from './locale';

import Button from './components/Button';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crashlytics().log('App is starting.');
    startI18nLaguage().then(() => setLoading(false));
    // throw new Error('Teste');
    // crashlytics().crash();
    crashlytics().recordError(new Error('Teste'));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />

      {loading ? (
        <Loading />
      ) : (
        <AppProvider>
          {/* <Routes /> */}
          <Button onPress={() => crashlytics().crash()} text="Crash" />
        </AppProvider>
      )}
    </NavigationContainer>
  );
};

export default App;
