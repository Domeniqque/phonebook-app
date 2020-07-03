import React, { useState, useEffect, useCallback } from 'react';
import { InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import Loading from '../../components/Loading';
import PhoneFilter from '../../components/PhoneFilter';
import { usePhone, PhoneResults, PhoneStatus } from '../../hooks/phone';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  HeaderButtonAdd,
  Divisor,
} from './styles';

const Phones: React.FC = () => {
  const [phones, setPhones] = useState<PhoneResults>();
  const [status, setStatus] = useState<PhoneStatus>(PhoneStatus.New);
  const [filterLoading, setFilterLoading] = useState(true);
  const [phoneLoading, setPhoneLoading] = useState(true);

  const navigation = useNavigation();
  const { findByStatus } = usePhone();

  useEffect(() => {
    function loadPhones(): void {
      setPhoneLoading(true);

      InteractionManager.runAfterInteractions(async () => {
        const data = await findByStatus(status);

        setPhones(data);

        setTimeout(() => {
          setFilterLoading(false);
          setPhoneLoading(false);
        }, 300);
      });
    }

    loadPhones();

    const unsubscribe = navigation.addListener('focus', loadPhones);

    return unsubscribe;
  }, [navigation, findByStatus, status]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonAdd>
          <Icon
            name="plus"
            size={28}
            onPress={() => navigation.navigate('CreatePhone')}
          />
        </HeaderButtonAdd>
      ),
    });
  }, [navigation]);

  const renderPlaceholderItems = useCallback(() => {
    const items = [];

    for (let index = 0; index < 10; index++) {
      items.push(<PlaceholderLine height={30} key={`${index}-ph-phone`} />);
    }

    return items;
  }, []);

  return (
    <Container>
      <PhoneFilter onStatusChange={setStatus} loading={filterLoading} />

      {phoneLoading ? (
        <Placeholder
          Animation={props => <Fade {...props} duration={500} />}
          style={{ marginTop: 30 }}
        >
          {renderPlaceholderItems()}
        </Placeholder>
      ) : (
        <PhoneList
          data={phones}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Divisor />}
          renderItem={({ item }) => (
            <PhoneListItem
              onPress={() => navigation.navigate('ShowPhone', { id: item.id })}
            >
              <PhoneListItemNumber>{item.nationalValue}</PhoneListItemNumber>
              <Icon name="chevron-right" size={28} />
            </PhoneListItem>
          )}
        />
      )}
    </Container>
  );
};

export default Phones;
