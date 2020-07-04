import React from 'react';

import { PhoneProvider } from './phone';
import { AlertProvider } from './alert';
import { LocaleProvider } from './locale';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LocaleProvider>
      <AlertProvider>
        <PhoneProvider>{children}</PhoneProvider>
      </AlertProvider>
    </LocaleProvider>
  );
};

export default AppProvider;
