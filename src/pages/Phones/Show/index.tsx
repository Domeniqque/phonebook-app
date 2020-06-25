import React, { useCallback, useEffect, useState } from 'react';
import { Linking, InteractionManager } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { PhoneStackProps } from '../../../routes/phones.routes';
import { PhoneResult, usePhone } from '../../../hooks/phone';
import Loading from '../../../components/Loading';

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
  const [phone, setPhone] = useState<PhoneResult>({} as PhoneResult);
  const [loading, setLoading] = useState(true);

  const { params } = useRoute<ShowPhoneScreenProps>();
  const { findById } = usePhone();

  useEffect(() => {
    async function loadPhone(): Promise<void> {
      const data = await findById(params.id);

      if (data) setPhone(data);

      setLoading(false);
    }

    InteractionManager.runAfterInteractions(loadPhone);
  }, [params.id, findById]);

  const handleCallToPhone = useCallback(() => {
    Linking.openURL(`tel:${phone?.nationalValue}`);
  }, [phone?.nationalValue]);

  return (
    <Container>
      {loading && <Loading />}

      <Header>
        <HeaderAction onPress={handleCallToPhone}>
          <HeaderText>{phone?.nationalValue}</HeaderText>
          <HeaderLabel>toque para chamar</HeaderLabel>
        </HeaderAction>
      </Header>

      <ActionTitle>Situação</ActionTitle>

      <ActionContainer>
        <ActionButton>
          <Icon name="phone-incoming" size={36} />
          <ActionButtonText>Atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="phone-off" size={36} />
          <ActionButtonText>Inexistente</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="phone-missed" size={36} />
          <ActionButtonText>Não atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton>
          <Icon name="x" size={36} />
          <ActionButtonText>Não ligar mais</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default Show;
