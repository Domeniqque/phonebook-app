import React, { useEffect, useState } from 'react';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import { LayoutAnimation } from 'react-native';
import getRealm from '../../services/realm';
import { PhoneNumber } from '../../hooks/phone';

import { Text } from './styles';

interface InlineProps {
  interestedId: string;
}

const InlinePhones: React.FC<InlineProps> = ({ interestedId }) => {
  const [phones, setPhones] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPhones(): Promise<void> {
      const realm = await getRealm();

      const data = realm
        .objects<PhoneNumber>('Phones')
        .filtered(`interested_id = "${interestedId}"`);

      const inlineNumbers = data.map(p => p.nationalValue).join(', ');

      setPhones(inlineNumbers);
      setLoading(false);
    }

    loadPhones();
  }, [interestedId]);

  if (loading) {
    return (
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={12} width={30} style={{ marginTop: 5 }} />
      </Placeholder>
    );
  }

  return <Text>{phones}</Text>;
};

export default InlinePhones;
