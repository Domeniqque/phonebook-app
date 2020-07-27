import React, { useCallback, useRef, useState, useMemo } from 'react';
import {
  InteractionManager,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import { usePhone } from '../../../hooks/phone';
import { useAlert } from '../../../hooks/alert';
import { useLocale } from '../../../hooks/locale';

import { Container, Tip, TipText } from './styles';
import getLocalePhonePlaceholder from '../../../utils/getLocalePhonePlaceholder';

interface CreateNumbersData {
  firstNumber: string;
  lastNumber: string;
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const firstNumberRef = useRef<PhoneInputRef>(null);
  const lastNumberRef = useRef<PhoneInputRef>(null);

  const [loading, setLoading] = useState(false);

  const { addSequence } = usePhone();
  const { alert, success } = useAlert();
  const { trans, country } = useLocale();

  const navigation = useNavigation();

  const placeholder = useMemo(() => getLocalePhonePlaceholder(country.value), [
    country.value,
  ]);

  const handleCreateNumbers = useCallback(
    async (formData: CreateNumbersData) => {
      crashlytics().log('Criando uma lista de números');

      formRef.current?.setErrors({});
      setLoading(true);

      try {
        const schema = Yup.object({
          firstNumber: Yup.string().required(
            trans('phones.create.validation.firstNumberRequired'),
          ),
          lastNumber: Yup.string().required(
            trans('phones.create.validation.lastNumberRequired'),
          ),
        });

        await schema.validate(formData, { abortEarly: false });

        InteractionManager.runAfterInteractions(async () => {
          await addSequence({
            firstNumber: firstNumberRef.current?.getPhoneInstance(),
            lastNumber: lastNumberRef.current?.getPhoneInstance(),
            callOnSuccess: () => {
              success();
              navigation.navigate('Phones');
            },
          });

          setLoading(false);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError)
          formRef.current?.setErrors(getValidationErrors(err));
        else {
          alert({
            title: trans('defaultError.title'),
            text: trans('defaultError.text'),
            confirmText: 'OK',
          });

          crashlytics().recordError(err);
        }

        setLoading(false);
      }
    },
    [addSequence, navigation, success, alert, trans],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container>
        {loading && <Loading />}
        <Tip>
          <TipText>{trans('phones.create.tip')}</TipText>
        </Tip>

        <Form
          ref={formRef}
          onSubmit={handleCreateNumbers}
          style={{ marginTop: 20 }}
        >
          <PhoneInput
            ref={firstNumberRef}
            label={trans('phones.create.label.first')}
            name="firstNumber"
            countryCode={country.value}
            returnKeyType="next"
            onSubmitEditing={() => lastNumberRef.current?.focus()}
            placeholder={placeholder}
            autoFocus
          />

          <PhoneInput
            ref={lastNumberRef}
            label={trans('phones.create.label.last')}
            name="lastNumber"
            returnKeyType="next"
            countryCode={country.value}
            onSubmitEditing={() => formRef.current?.submitForm()}
            placeholder={placeholder}
          />

          <Button
            text={trans('phones.create.button')}
            icon="save"
            style={{ marginTop: 8 }}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Create;
