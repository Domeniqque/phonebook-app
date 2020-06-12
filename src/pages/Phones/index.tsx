import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import { usePhone } from '../../hooks/phone';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  PhoneListItemAction,
} from './styles';

const Phones: React.FC = () => {
  const { phones } = usePhone();

  const navigation = useNavigation();

  return (
    <Container>
      <Button
        text="Adicionar números"
        icon="plus"
        onPress={() => navigation.navigate('CreatePhones')}
      />

      <PhoneList
        data={phones}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <PhoneListItem>
            <PhoneListItemNumber>{item.value}</PhoneListItemNumber>
            <PhoneListItemAction>
              <Icon name="phone-call" size={20} />
            </PhoneListItemAction>
          </PhoneListItem>
        )}
      />
    </Container>
  );
};

export default Phones;
