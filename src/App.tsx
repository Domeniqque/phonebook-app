import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#000" />

        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
