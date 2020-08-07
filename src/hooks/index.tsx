import React from 'react';

import { PhoneProvider } from './phone';
import { AlertProvider } from './alert';
import { LocaleProvider } from './locale';
import { InterestedProvider } from './interested';
import { CredentialProvider } from './credential';
import Compose from './components/Compose';

const AppProvider: React.FC = ({ children }) => {
  return (
    <Compose
      components={[
        CredentialProvider,
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
