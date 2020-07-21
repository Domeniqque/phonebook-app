import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import FabButton from '../../components/FabButton';
import InlinePhones from '../../components/InlinePhones';
import Button from '../../components/Button';
import { useInterested, InterestedListResult } from '../../hooks/interested';
import { useLocale } from '../../hooks/locale';

import {
  Container,
  InterestedList,
  InterestedItem,
  InterestedItemHeader,
  InterestedItemName,
  Divisor,
  EmptyContentContainer,
} from './styles';

const Interested: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [interested, setInterested] = useState<InterestedListResult>(
    {} as InterestedListResult,
  );

  const { trans } = useLocale();

  const navigation = useNavigation();
  const { getAll } = useInterested();

  useEffect(() => {
    async function loadInterested(): Promise<void> {
      const data = await getAll();

      setInterested(data);
      setLoading(false);
    }

    loadInterested();

    const unsubscribe = navigation.addListener('focus', loadInterested);

    return unsubscribe;
  }, [getAll, navigation]);

  const renderPlaceholderItems = useCallback(() => {
    const items = [];

    for (let index = 0; index < 8; index++) {
      items.push(<PlaceholderLine height={30} key={`${index}-interested`} />);
    }

    return items;
  }, []);

  if (loading) {
    return (
      <Container>
        <Placeholder Animation={Fade}>{renderPlaceholderItems()}</Placeholder>
      </Container>
    );
  }

  if (interested.length === 0) {
    return (
      <Container>
        <EmptyContentContainer>
          <Button
            text={trans('interested.empty')}
            onPress={() => navigation.navigate('CreateInterested')}
            icon="plus"
            outlined
          />
        </EmptyContentContainer>
      </Container>
    );
  }

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
              <InterestedItemName>
                {item?.name || trans('interested.show.unnamed')}
              </InterestedItemName>
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
