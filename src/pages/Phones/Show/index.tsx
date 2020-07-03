import React, { useCallback, useEffect, useState } from 'react';
import { Linking, InteractionManager } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { PhoneStackProps } from '../../../routes/phones.routes';
import { PhoneResult, usePhone, PhoneStatus } from '../../../hooks/phone';
import { useAlert } from '../../../hooks/alert';
import { useLang } from '../../../hooks/lang';

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

  const { params } = useRoute<ShowPhoneScreenProps>();
  const { findById, setStatus, destroy } = usePhone();
  const navigation = useNavigation();
  const { alert, success } = useAlert();
  const { trans } = useLang();

  const handleCallToPhone = useCallback(() => {
    if (phone?.status !== PhoneStatus.Removed)
      Linking.openURL(`tel:${phone?.nationalValue}`);
  }, [phone?.nationalValue, phone?.status]);

  const handlePhoneStatus = useCallback(
    async (status: PhoneStatus) => {
      if (!phone?.id) return;

      InteractionManager.runAfterInteractions(() => {
        setStatus(phone?.id, status)
          .then(() => {
            success();

            navigation.navigate('Phones');
          })
          .catch(() => {
            alert({
              title: 'Desculpe! Algo deu errado. 😢',
              text:
                'Não foi possível alterar a situação. O que acha de fechar o aplicativo e tentar novamente?',
              confirmText: 'OK',
            });
          });
      });
    },
    [phone?.id, setStatus, navigation, success, alert],
  );

  const handleDeletePhone = useCallback(() => {
    if (!phone?.id) return;

    alert({
      title: trans('phones.show.deleteTitle'),
      confirmText: trans('phones.show.deleteOk'),
      cancelText: trans('phones.show.deleteCancel'),
      onConfirm: () => {
        destroy(phone?.id).then(() => {
          success();
          navigation.navigate('Phones');
        });
      },
    });
  }, [phone?.id, destroy, navigation, alert, success, trans]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton onPress={handleDeletePhone}>
          <Icon name="trash" size={25} color="#000" />
        </DeleteButton>
      ),
    });
  }, [navigation, handleDeletePhone]);

  useEffect(() => {
    async function loadPhone(): Promise<void> {
      const data = await findById(params.id);

      if (data) setPhone(data);
    }

    InteractionManager.runAfterInteractions(loadPhone);
  }, [params.id, findById]);

  return (
    <Container>
      <Header>
        <HeaderAction onPress={handleCallToPhone}>
          <HeaderText>{phone?.nationalValue}</HeaderText>
          {phone?.status !== PhoneStatus.Removed && (
            <HeaderLabel>{trans('phones.show.clickToCall')}</HeaderLabel>
          )}
        </HeaderAction>
      </Header>

      <ActionContainer>
        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Received)}>
          <Icon name="phone-incoming" size={36} />
          <ActionButtonText>{trans('phoneFilter.received')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.NotExist)}>
          <Icon name="phone-off" size={36} />
          <ActionButtonText>{trans('phoneFilter.notExist')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Missed)}>
          <Icon name="phone-missed" size={36} />
          <ActionButtonText>{trans('phoneFilter.missed')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Removed)}>
          <Icon name="x" size={36} />
          <ActionButtonText>{trans('phoneFilter.removed')}</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default Show;
