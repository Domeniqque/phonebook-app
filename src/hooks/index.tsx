import React from 'react';

import { PhoneProvider } from './usePhone';

const AppProvider: React.FC = ({ children }) => {
  return <PhoneProvider>{children}</PhoneProvider>;
};

export default AppProvider;
