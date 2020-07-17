import React, { useCallback, useRef, useMemo, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAlert } from '../../../hooks/alert';
import { useLocale } from '../../../hooks/locale';
import { useInterested } from '../../../hooks/interested';
import Input from '../../../components/Input';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import getLocalePhonePlaceholder from '../../../utils/getLocalePhonePlaceholder';

import { Container } from './styles';

interface InterestedFormData {
  name: string;
  address: string;
  phoneNumber: string;
  lifeStage: string;
  gender: string;
}

const Create: React.FC = () => {
  const phoneNumberRef = useRef<PhoneInputRef>(null);
  const formRef = useRef<FormHandles>(null);
  const { trans, country } = useLocale();
  const { alert, success } = useAlert();
  const { addInterested } = useInterested();
  const navigation = useNavigation();

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

        await addInterested(data);

        navigation.navigate('Interested');
        success();
      } catch (err) {
        if (err instanceof Yup.ValidationError)
          formRef.current?.setErrors(getValidationErrors(err));
        else {
          alert({
            title: trans('defaultError.title'),
            text: trans('defaultError.text'),
            confirmText: 'OK',
          });

          console.error(err);

          crashlytics().recordError(err);
        }
      }
    },
    [trans, alert, gender, lifeStage, addInterested],
  );

  const genderTypes = useMemo(
    () => [
      { label: trans('gender.M'), value: 'M' },
      { label: trans('gender.F'), value: 'F' },
    ],
    [trans],
  );

  const lifeStageTypes = useMemo(
    () => [
      { label: trans('lifeStages.child'), value: 'child' },
      { label: trans('lifeStages.young'), value: 'young' },
      { label: trans('lifeStages.adult'), value: 'adult' },
      { label: trans('lifeStages.elderly'), value: 'elderly' },
    ],
    [trans],
  );

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Form
          ref={formRef}
          onSubmit={handleCreateInterested}
          style={{ marginTop: 20 }}
        >
          <Input
            name="name"
            label={trans('interested.create.nameLabel')}
            autoCorrect={false}
            autoCompleteType="off"
            autoFocus
          />

          <Input
            name="address"
            label={trans('interested.create.addressLabel')}
            placeholder={trans('interested.create.addressPlaceholder')}
          />

          <PhoneInput
            ref={phoneNumberRef}
            name="phoneNumber"
            countryCode={country.value}
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
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Create;
