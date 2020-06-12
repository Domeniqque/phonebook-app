import React, { useCallback, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import Button from '../../../components/Button';

import { Container } from './styles';
import { PhoneStackProps } from '../../../routes/phones.routes';
import { usePhone, PhoneNumber } from '../../../hooks/phone';

type ShowPhoneScreenProps = RouteProp<PhoneStackProps, 'ShowPhone'>;

const Show: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<ShowPhoneScreenProps>();

  useEffect(() => {
    navigation.setOptions({ title: params.value });
  }, [params, navigation]);

  return (
    <Container>
      <Button text="Cadastrar números" onPress={() => {}} />
    </Container>
  );
};

export default Show;
