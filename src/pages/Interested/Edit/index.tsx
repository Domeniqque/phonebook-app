import React, { useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import Button from '../../../components/Button';
import { useAlert } from '../../../hooks/alert';
import { useInterested, InterestedResult } from '../../../hooks/interested';
import { useLocale } from '../../../hooks/locale';
import getRealm from '../../../services/realm';
import { InterestedStackProps } from '../../../routes/interested.routes';
import Select from '../../../components/Select';
import Input from '../../../components/Input';

import { Container } from './styles';

type InterestedScreenProps = RouteProp<InterestedStackProps, 'EditInterested'>;

const Edit: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [lifeStage, setLifeStage] = useState('');

  const [interested, setInterested] = useState<InterestedResult>(
    {} as InterestedResult,
  );

  const navigation = useNavigation();
  const { params } = useRoute<InterestedScreenProps>();
  const { findById, lifeStageTypes, genderTypes } = useInterested();
  const { trans } = useLocale();
  const { success, alert } = useAlert();

  useEffect(() => {
    async function loadInterested(): Promise<void> {
      crashlytics().log('Carregando dados na tela de edição de interessado');
      const data = await findById(params.id);

      if (data) {
        setInterested(data);
        setName(data.name);
        setAddress(data.address);
        setGender(data.gender);
        setLifeStage(data.lifeStage);
      }
    }

    loadInterested();
  }, [findById, params.id]);

  const handleSubmit = useCallback(async () => {
    crashlytics().log('Salvando edição de um interessado');

    try {
      success();
      const realm = await getRealm();
      const id = interested?.id;

      realm.write(() => {
        realm.create(
          'Interested',
          { id, name, gender, lifeStage, address },
          true,
        );
      });

      navigation.navigate('ShowInterested', { id });
    } catch (err) {
      crashlytics().recordError(err);

      alert({
        title: trans('defaultError.title'),
        text: trans('defaultError.text'),
        confirmText: 'OK',
      });
    }
  }, [
    interested?.id,
    success,
    alert,
    trans,
    name,
    address,
    gender,
    lifeStage,
    navigation,
  ]);

  return (
    <Container keyboardShouldPersistTaps="always">
      <Form onSubmit={() => null} initialData={{ name, address }}>
        <Input
          name="name"
          autoFocus
          label={trans('interested.create.nameLabel')}
          onChangeText={setName}
        />

        <Input
          name="address"
          label={trans('interested.create.addressLabel')}
          onChangeText={setAddress}
        />
      </Form>

      <Select
        label={trans('interested.create.lifeStageLabel')}
        placeholder={trans('interested.create.lifeStagePlaceholder')}
        values={lifeStageTypes}
        defaultValue={interested?.lifeStage}
        onSelect={item => setLifeStage(item.value)}
      />

      <Select
        label={trans('interested.create.genderLabel')}
        placeholder={trans('interested.create.genderPlaceholder')}
        values={genderTypes}
        defaultValue={interested?.gender}
        onSelect={item => setGender(item.value)}
      />

      <Button
        icon="save"
        style={{ marginTop: 20 }}
        onPress={handleSubmit}
        text={trans('interested.edit.buttonText')}
      />
    </Container>
  );
};

export default Edit;
