import React, { useCallback, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import { usePhone } from '../../../hooks/phone';
import { useAlert } from '../../../hooks/alert';

import { Container } from './styles';

interface CreateNumbersData {
  firstNumber: string;
  lastNumber: string;
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const firstNumberRef = useRef<PhoneInputRef>(null);
  const lastNumberRef = useRef<PhoneInputRef>(null);

  const [loading, setLoading] = useState(false);

  const { addSequence, countryCode } = usePhone();
  const { alert, success } = useAlert();

  const navigation = useNavigation();

  const handleCreateNumbers = useCallback(
    async (formData: CreateNumbersData) => {
      formRef.current?.setErrors({});
      setLoading(true);

      try {
        const schema = Yup.object({
          firstNumber: Yup.string().required(
            'Qual o primeiro número telefônico da sequência?',
          ),
          lastNumber: Yup.string().required(
            'Não esqueça do último número da sequência',
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
            title: 'Ops, me desculpe 😢',
            text:
              'Houve erro inesperado. O que acha de fechar o aplicativo e tentar novamente?',
            confirmText: 'OK',
          });
        }

        setLoading(false);
      }
    },
    [addSequence, navigation, success, alert],
  );

  return (
    <Container>
      {loading && <Loading />}

      <Form ref={formRef} onSubmit={handleCreateNumbers}>
        <PhoneInput
          ref={firstNumberRef}
          label="Primeiro número"
          name="firstNumber"
          countryCode={countryCode}
          returnKeyType="next"
          onSubmitEditing={() => lastNumberRef.current?.focus()}
          focusable
        />

        <PhoneInput
          ref={lastNumberRef}
          label="Último número"
          name="lastNumber"
          returnKeyType="next"
          countryCode={countryCode}
          onSubmitEditing={() => formRef.current?.submitForm()}
        />

        <Button
          text="Cadastrar números"
          icon="save"
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
    </Container>
  );
};

export default Create;
