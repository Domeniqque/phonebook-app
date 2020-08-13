/* eslint-disable no-console */
import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { View, AppState, AppStateStatus } from 'react-native';
import storage from '@react-native-firebase/storage';

import { useCredential } from '../../hooks/credential';
import getRealm from '../../services/realm';

const BackupJob: React.FC = () => {
  const { signed } = useCredential();
  const [isInactive, setIsInactive] = useState(false);

  const fileRef = useMemo(() => {
    const prefix = __DEV__ ? '/dev' : '/prod';

    return storage().ref(`${prefix}/backup.realm`);
  }, []);

  const submitBackup = useCallback(async () => {
    const updatedAt = new Date().toISOString();
    console.log(` [${updatedAt}] submiting backup file`);

    const realm = await getRealm();
    realm.close();

    await fileRef.putFile(realm.path);

    console.log(` [${new Date().toISOString()}] backup submited`);
  }, [fileRef]);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus): void {
      setIsInactive(!!nextAppState.match(/inactive|background/));
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (signed && isInactive) submitBackup();
  }, [signed, isInactive, submitBackup]);

  return <View />;
};

export default BackupJob;
