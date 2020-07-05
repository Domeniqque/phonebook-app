import React, { useCallback, useEffect, useState } from 'react';
import { Linking, InteractionManager, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import { PhoneStackProps } from '../../../routes/phones.routes';
import { PhoneResult, usePhone, PhoneStatus } from '../../../hooks/phone';
import { useAlert } from '../../../hooks/alert';
import { useLocale } from '../../../hooks/locale';

import {
  Container,
  Header,
  HeaderAction,
  HeaderText,
  HeaderLabel,
  PhoneStatusLabel,
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
  const { alert, success } = useAlert();
  const { trans } = useLocale();

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
              title: trans('defaultError.title'),
              text: trans('defaultError.text'),
              confirmText: 'OK',
            });
          });
      });
    },
    [phone?.id, setStatus, navigation, success, alert, trans],
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
      setLoading(false);
    }

    InteractionManager.runAfterInteractions(loadPhone);
  }, [params.id, findById]);

  const resolvePhoneStatusName = useCallback(
    (status: number | undefined): string => {
      switch (status) {
        case PhoneStatus.Received:
          return trans('phoneStatus.received');
        case PhoneStatus.Missed:
          return trans('phoneStatus.missed');
        case PhoneStatus.NotExist:
          return trans('phoneStatus.notExist');
        case PhoneStatus.Removed:
          return trans('phoneStatus.removed');
        default:
          return trans('phoneStatus.new');
      }
    },
    [trans],
  );

  return (
    <Container>
      <Header>
        {loading ? (
          <Placeholder Animation={Fade}>
            <View style={{ alignItems: 'center' }}>
              <PlaceholderLine height={35} width={50} />
            </View>
          </Placeholder>
        ) : (
          <HeaderAction onPress={handleCallToPhone}>
            <HeaderText>{phone?.nationalValue}</HeaderText>
            {phone?.status !== PhoneStatus.Removed && (
              <HeaderLabel>{trans('phones.show.clickToCall')}</HeaderLabel>
            )}
          </HeaderAction>
        )}
      </Header>

      <PhoneStatusLabel>
        {resolvePhoneStatusName(phone?.status)}
      </PhoneStatusLabel>

      <ActionContainer>
        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Received)}>
          <Icon name="phone-incoming" size={36} />
          <ActionButtonText>{trans('phoneStatus.received')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.NotExist)}>
          <Icon name="phone-off" size={36} />
          <ActionButtonText>{trans('phoneStatus.notExist')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Missed)}>
          <Icon name="phone-missed" size={36} />
          <ActionButtonText>{trans('phoneStatus.missed')}</ActionButtonText>
        </ActionButton>

        <ActionButton onPress={() => handlePhoneStatus(PhoneStatus.Removed)}>
          <Icon name="x" size={36} />
          <ActionButtonText>{trans('phoneStatus.removed')}</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default Show;
