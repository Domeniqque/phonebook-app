/* eslint-disable no-console */
import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, differenceInMinutes } from 'date-fns';
import { useCredential } from '../../hooks/credential';
import getRealm from '../../services/realm';

const LAST_BACKUP_KEY = '@PhonePreaching/LastBackup';
const MINUTES_INTERVAL = 30;

async function lastUpdateDistanceInMinutes(): Promise<number | undefined> {
  const lastBackup = await AsyncStorage.getItem(LAST_BACKUP_KEY);

  if (lastBackup) {
    const date = parseISO(lastBackup);

    return differenceInMinutes(date, new Date());
  }

  return undefined;
}

const BackupJob: React.FC = () => {
  const { signed } = useCredential();

  useEffect(() => {
    async function startJob(): Promise<void> {
      const lastBackupMin = await lastUpdateDistanceInMinutes();

      if (lastBackupMin === undefined || lastBackupMin >= MINUTES_INTERVAL) {
        console.log(' [*] start backup job');
        const realm = await getRealm();

        const updatedAt = new Date().toISOString();

        console.log({ lastBackupMin, updatedAt });
      }
    }

    if (signed) {
      startJob();
    }
  }, [signed]);

  return <View />;
};

export default BackupJob;
