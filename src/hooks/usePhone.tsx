import React, { createContext, useState, useContext } from 'react';

export interface PhoneNumber {
  key: string;
  value: string;
  state: 'new' | 'received' | 'missed' | 'dont_exists';
  active: boolean;
}

interface PhoneContextData {
  phones: PhoneNumber[];
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const [phones, setPhones] = useState<PhoneNumber[]>([] as PhoneNumber[]);

  return (
    <PhoneContext.Provider value={{ phones }}>{children}</PhoneContext.Provider>
  );
};

export function usePhone(): PhoneContextData {
  const context = useContext(PhoneContext);

  if (!context) {
    throw new Error('useAuth must be used within an PhoneContext!');
  }

  return context;
}
