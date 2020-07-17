import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import FabButton from '../../components/FabButton';
import InlinePhones from '../../components/InlinePhones';
import { useInterested, InterestedListResult } from '../../hooks/interested';

import {
  Container,
  InterestedList,
  InterestedItem,
  InterestedItemHeader,
  InterestedItemName,
  Divisor,
} from './styles';

const Interested: React.FC = () => {
  const navigation = useNavigation();
  const { getAll } = useInterested();
  const [interested, setInterested] = useState<InterestedListResult>(
    {} as InterestedListResult,
  );

  useEffect(() => {
    async function loadInterested(): Promise<void> {
      const data = await getAll();

      setInterested(data);
    }

    loadInterested();
  }, [getAll]);

  return (
    <Container>
      <InterestedList
        data={interested}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divisor />}
        renderItem={({ item }) => (
          <InterestedItem
            onPress={() => {
              navigation.navigate('ShowInterested', { id: item.id });
            }}
          >
            <InterestedItemHeader>
              <InterestedItemName>{item.name}</InterestedItemName>
              <InlinePhones interestedId={item.id} />
            </InterestedItemHeader>

            <Icon name="chevron-right" size={28} />
          </InterestedItem>
        )}
      />

      <FabButton onPress={() => navigation.navigate('CreateInterested')} />
    </Container>
  );
};

export default Interested;
