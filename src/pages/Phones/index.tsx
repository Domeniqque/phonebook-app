import React, { useState, useEffect } from 'react';
import { View, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Loading from '../../components/Loading';
import PhoneFilter from '../../components/PhoneFilter';
import { usePhone, PhoneResults, PhoneStatus } from '../../hooks/phone';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  HeaderButtonAdd,
} from './styles';

const Phones: React.FC = () => {
  const [phones, setPhones] = useState<PhoneResults>();
  const [status, setStatus] = useState<PhoneStatus>(PhoneStatus.New);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { findByStatus } = usePhone();

  useEffect(() => {
    function loadPhones(): void {
      InteractionManager.runAfterInteractions(async () => {
        setLoading(true);

        const data = await findByStatus(status);

        setPhones(data);
        setLoading(false);
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

  return (
    <Container>
      {loading && <Loading />}

      <PhoneFilter onStatusChange={setStatus} />

      <PhoneList
        data={phones}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          />
        )}
        renderItem={({ item }) => (
          <PhoneListItem
            onPress={() => navigation.navigate('ShowPhone', { id: item.id })}
          >
            <PhoneListItemNumber>{item.nationalValue}</PhoneListItemNumber>
            <Icon name="chevron-right" size={28} />
          </PhoneListItem>
        )}
      />
    </Container>
  );
};

export default Phones;
