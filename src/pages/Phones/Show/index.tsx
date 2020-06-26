import React, { useCallback, useEffect, useState } from 'react';
import { Linking, InteractionManager, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { PhoneStackProps } from '../../../routes/phones.routes';
import { PhoneResult, usePhone, PhoneStatus } from '../../../hooks/phone';
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
  DeleteButton,
} from './styles';

type ShowPhoneScreenProps = RouteProp<PhoneStackProps, 'ShowPhone'>;

const Show: React.FC = () => {
  const [phone, setPhone] = useState<PhoneResult>({} as PhoneResult);
  const [loading, setLoading] = useState(true);

  const { params } = useRoute<ShowPhoneScreenProps>();
  const { findById, setStatus, destroy } = usePhone();
  const navigation = useNavigation();

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

  const handlePhoneStatus = useCallback(
    async (status: PhoneStatus) => {
      if (!phone?.id) return;

      setLoading(true);

      InteractionManager.runAfterInteractions(() => {
        setStatus(phone?.id, status)
          .then(() => {
            setLoading(false);

            navigation.navigate('Phones');
          })
          .catch(() => {
            setLoading(false);

            Alert.alert('Desculpe', 'Não foi possível atalizar a situação');
          });
      });
    },
    [phone?.id, setStatus, navigation],
  );

  const handleDeletePhone = useCallback(() => {
    if (!phone?.id) return;

    Alert.alert(
      'Confirmar exclusão',
      `Você tem certeza que deseja excluir o número ${phone?.nationalValue}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            destroy(phone?.id).then(() => {
              navigation.navigate('Phones');
              Alert.alert('Número excluído com sucesso');
            });
          },
        },
      ],
    );
  }, [phone?.nationalValue, phone?.id, destroy, navigation]);

  return (
    <Container>
      {loading && <Loading />}

      <Header>
        <DeleteButton onPress={handleDeletePhone}>
          <Icon name="trash" size={25} color="#000" />
        </DeleteButton>

        <HeaderAction onPress={handleCallToPhone}>
          <HeaderText>{phone?.nationalValue}</HeaderText>
          <HeaderLabel>toque para chamar</HeaderLabel>
        </HeaderAction>
      </Header>

      <ActionContainer>
        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Received)}>
          <Icon name="phone-incoming" size={36} />
          <ActionButtonText>Atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.DontExists)}>
          <Icon name="phone-off" size={36} />
          <ActionButtonText>Inexistente</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Missed)}>
          <Icon name="phone-missed" size={36} />
          <ActionButtonText>Não atendeu</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Removed)}>
          <Icon name="x" size={36} />
          <ActionButtonText>Não ligar mais</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default Show;
