import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from 'react-native';

import {
  PhoneNumber,
  Container,
  Title,
  AddPhoneButton,
  AddPhoneButtonText,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  PhoneListItemAction,
} from './styles';

const Phones: React.FC = () => {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([] as PhoneNumber[]);

  return (
    <Container>
      <Title>Números</Title>

      <AddPhoneButton>
        <Icon name="plus" size={24} color="#fff" />
        <AddPhoneButtonText>Adicionar números</AddPhoneButtonText>
      </AddPhoneButton>

      <PhoneList
        data={numbers}
        keyExtractor={item => item.id}
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
