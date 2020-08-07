/* eslint-disable no-console */
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-community/google-signin';

const webClientId =
  '137049518356-6cko05qapr6cd0i91qavbmr61nl311hs.apps.googleusercontent.com'; // android/app/google-services.json

interface CredentialContextData {
  signed: boolean;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  userEmail: string;
  userName: string;
}

const CredentialContext = createContext<CredentialContextData>(
  {} as CredentialContextData,
);

export const CredentialProvider: React.FC = ({ children }) => {
  const [credential, setCredential] = useState<User | null>(null);
  const signed = useMemo(() => !!credential, [credential]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      offlineAccess: false,
    });

    async function getCurrentUser(): Promise<void> {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setCredential(userInfo);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          console.log(' [-] Signin required');
        } else {
          console.error(error);
        }
      }
    }

    getCurrentUser();
  }, []);

  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      setCredential(userInfo);

      console.log(JSON.stringify(userInfo));
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          console.log(' [*] login canceled');
          break;
        case statusCodes.IN_PROGRESS:
          console.log(' [-] login in progress...');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
          console.error(error);
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      setCredential(null);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <CredentialContext.Provider
      value={{
        signed,
        signIn,
        signOut,
        userEmail: credential?.user.email || '',
        userName: credential?.user.givenName || '',
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export function useCredential(): CredentialContextData {
  const context = useContext(CredentialContext);

  if (!context) {
    throw new Error('useCredential must be used within an CredentialContext!');
  }

  return context;
}
