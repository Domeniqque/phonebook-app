import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import AppProvider from './hooks';
import Loading from './components/Loading';

import { startLaguage } from './locale';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startLaguage().then(() => setLoading(false));
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
