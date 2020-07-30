import React from 'react';

import { PhoneProvider } from './phone';
import { AlertProvider } from './alert';
import { LocaleProvider } from './locale';
import { InterestedProvider } from './interested';
import Compose from './components/Compose';

const AppProvider: React.FC = ({ children }) => {
  return (
    <Compose
      components={[
        LocaleProvider,
        AlertProvider,
        PhoneProvider,
        InterestedProvider,
      ]}
    >
      {children}
    </Compose>
  );
};

export default AppProvider;
