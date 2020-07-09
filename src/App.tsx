import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import Routes from './routes';
import AppProvider from './hooks';
import Loading from './components/Loading';

import { startI18nLaguage } from './locale';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startI18nLaguage().then(lang => {
      crashlytics().log(`App mounted. Language: "${lang}"`);
      setLoading(false);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />

      {loading ? (
        <Loading />
      ) : (
        <AppProvider>
          <Routes />
        </AppProvider>
      )}
    </NavigationContainer>
  );
};

export default App;
