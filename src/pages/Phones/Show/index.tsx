import React, { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { PhoneStackProps } from '../../../routes/phones.routes';
import { usePhone, PhoneNumber } from '../../../hooks/phone';

import {
  Container,
  Header,
  HeaderAction,
  HeaderText,
  HeaderLabel,
  ActionContainer,
  ActionButton,
  ActionButtonText,
  ActionTitle,
} from './styles';

type ShowPhoneScreenProps = RouteProp<PhoneStackProps, 'ShowPhone'>;

const Show: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<ShowPhoneScreenProps>();

  useEffect(() => {
    navigation.setOptions({ title: 'Atualizar' });
  }, [params, navigation]);

  const handleCallToPhone = useCallback(() => {
    Linking.openURL(`tel:${params.key}`);
  }, [params.key]);

  return (
    <Container>
      <Header>
        <HeaderAction onPress={handleCallToPhone}>
          <HeaderText>{params.value}</HeaderText>
          <HeaderLabel>toque para chamar</HeaderLabel>
        </HeaderAction>
      </Header>

      <ActionTitle>Situação</ActionTitle>

      <ActionContainer>
        <ActionButton>
          <Icon name="phone-incoming" size={34} />
          <ActionButtonText>Atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="phone-off" size={34} />
          <ActionButtonText>Inexistente</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="phone-missed" size={34} />
          <ActionButtonText>Não atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="x" size={34} />
          <ActionButtonText>Não ligar mais</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default Show;
