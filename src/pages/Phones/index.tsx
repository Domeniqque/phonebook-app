import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import { usePhone } from '../../hooks/phone';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
} from './styles';

const Phones: React.FC = () => {
  const { phones } = usePhone();

  const navigation = useNavigation();

  return (
    <Container>
      <Button
        text="Adicionar"
        icon="plus"
        onPress={() => navigation.navigate('CreatePhone')}
      />

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
