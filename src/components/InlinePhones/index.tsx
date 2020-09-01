import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import getRealm from '../../services/realm';
import { PhoneNumber } from '../../hooks/phone';

import { Text } from './styles';

interface InlineProps {
  interestedId: string;
}

const InlinePhones: React.FC<InlineProps> = ({ interestedId }) => {
  const [phones, setPhones] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    async function loadPhones(): Promise<void> {
      const realm = await getRealm();

      const data = realm
        .objects<PhoneNumber>('Phones')
        .filtered(`interested_id = "${interestedId}"`);

      const inlineNumbers = data.map(p => p.nationalValue).join(', ');

      setPhones(inlineNumbers);
    }

    loadPhones();

    const unsubscribe = navigation.addListener('focus', loadPhones);

    return unsubscribe;
  }, [interestedId, navigation]);

  return <Text>{phones}</Text>;
};

export default InlinePhones;
