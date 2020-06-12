import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import { usePhone, PhoneNumber } from '../../hooks/phone';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
} from './styles';

const Phones: React.FC = () => {
  const { phones } = usePhone();

  const navigation = useNavigation();

  const handleShowPhone = useCallback(
    (phone: PhoneNumber) => {
      navigation.navigate('ShowPhone', phone);
    },
    [navigation],
  );

  return (
    <Container>
      <Button
        text="Adicionar números"
        icon="plus"
        onPress={() => navigation.navigate('CreatePhone')}
      />

      <PhoneList
        data={phones}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <PhoneListItem onPress={() => handleShowPhone(item)}>
            <PhoneListItemNumber>{item.value}</PhoneListItemNumber>
            <Icon name="chevron-right" size={28} />
          </PhoneListItem>
        )}
      />
    </Container>
  );
};

export default Phones;
