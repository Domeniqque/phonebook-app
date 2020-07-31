import React, { useCallback, useRef, useMemo, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  useNavigation,
  useRoute,
  RouteProp,
  StackActions,
} from '@react-navigation/native';

import { Platform, View } from 'react-native';
import { useAlert } from '../../../hooks/alert';
import { useLocale } from '../../../hooks/locale';
import { useInterested } from '../../../hooks/interested';
import Input, { InputRef } from '../../../components/Input';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import { InterestedStackProps } from '../../../routes/interested.routes';
import getLocalePhonePlaceholder from '../../../utils/getLocalePhonePlaceholder';

import { Container } from './styles';

interface InterestedFormData {
  name: string;
  address: string;
  phoneNumber: string;
  lifeStage: string;
  gender: string;
}

type InterestedScreenProps = RouteProp<
  InterestedStackProps,
  'CreateInterested'
>;

const Create: React.FC = () => {
  const nameRef = useRef<InputRef>(null);
  const addressRef = useRef<InputRef>(null);
  const phoneNumberRef = useRef<PhoneInputRef>(null);
  const formRef = useRef<FormHandles>(null);

  const { trans, country } = useLocale();
  const { alert, success } = useAlert();
  const { addInterested, genderTypes, lifeStageTypes } = useInterested();
  const navigation = useNavigation();

  const { params } = useRoute<InterestedScreenProps>();

  const phonePlaceholder = useMemo(
    () => getLocalePhonePlaceholder(country.value),
    [country.value],
  );

  const [lifeStage, setLifeStage] = useState('');
  const [gender, setGender] = useState('');

  const handleCreateInterested = useCallback(
    async (formData: InterestedFormData) => {
      try {
        const schema = Yup.object({
          phoneNumber: Yup.string().required(
            trans('interested.validation.phoneNumber'),
          ),
        });

        await schema.validate(formData, { abortEarly: false });

        const data = {
          ...formData,
          lifeStage,
          gender,
          phoneNumber: phoneNumberRef.current?.getPhoneInstance(),
        };

        const id = await addInterested(data);

        success();

        navigation.dispatch(StackActions.pop(1));

        navigation.navigate('ShowInterested', {
          id,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError)
          formRef.current?.setErrors(getValidationErrors(err));
        else {
          crashlytics().recordError(err);

          alert({
            title: trans('defaultError.title'),
            text: trans('defaultError.text'),
            confirmText: 'OK',
          });

          console.error(err);
        }
      }
    },
    [trans, alert, gender, lifeStage, addInterested, success, navigation],
  );

  console.log({ ...lifeStageTypes });

  return (
    <Container>
      <Form
        ref={formRef}
        initialData={{ phoneNumber: params?.nationalPhone || '' }}
        onSubmit={handleCreateInterested}
        style={{ marginBottom: 30, flex: 1 }}
      >
        <Input
          ref={nameRef}
          name="name"
          label={trans('interested.create.nameLabel')}
          autoCorrect={false}
          autoCompleteType="off"
          onSubmitEditing={() => addressRef.current?.focus()}
          returnKeyType="next"
        />

        <Input
          ref={addressRef}
          name="address"
          label={trans('interested.create.addressLabel')}
          placeholder={trans('interested.create.addressPlaceholder')}
          onSubmitEditing={() => phoneNumberRef.current?.focus()}
          returnKeyType="next"
        />

        <PhoneInput
          ref={phoneNumberRef}
          name="phoneNumber"
          countryCode={params?.countryCode || country.value}
          placeholder={phonePlaceholder}
          label={trans('interested.create.phoneNumberLabel')}
        />

        <Select
          label={trans('interested.create.lifeStageLabel')}
          placeholder={trans('interested.create.lifeStagePlaceholder')}
          values={lifeStageTypes}
          onSelect={item => setLifeStage(item.value)}
        />

        <Select
          label={trans('interested.create.genderLabel')}
          placeholder={trans('interested.create.genderPlaceholder')}
          values={genderTypes}
          onSelect={item => setGender(item.value)}
        />

        <Button
          icon="save"
          style={{ marginTop: 20 }}
          onPress={() => formRef.current?.submitForm()}
          text={trans('interested.create.buttonText')}
        />
      </Form>
    </Container>
  );
};

export default Create;
