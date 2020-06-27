import React from 'react';

import { PhoneProvider } from './phone';
import { AlertProvider } from './alert';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <PhoneProvider>{children}</PhoneProvider>
    </AlertProvider>
  );
};

export default AppProvider;
