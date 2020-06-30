import React from 'react';

import { PhoneProvider } from './phone';
import { AlertProvider } from './alert';
import { LanguageProvider } from './lang';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LanguageProvider>
      <AlertProvider>
        <PhoneProvider>{children}</PhoneProvider>
      </AlertProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
