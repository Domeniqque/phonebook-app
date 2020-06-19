import React, { useCallback, useRef, useState } from 'react';
import { TextInput, Alert } from 'react-native';
import { Form, FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import PhoneInput from '../../../components/PhoneInput';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container } from './styles';
import { usePhone } from '../../../hooks/phone';

interface CreateNumbersData {
  startSequence: string;
  times: string;
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputTimesRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { getLastPhonePreview, createNumbers } = usePhone();

  const handleStartCreate = useCallback(
    ({ startSequence, times }: CreateNumbersData) => {
      setLoading(true);

      createNumbers(startSequence, times);

      setLoading(false);
      navigation.goBack();

      Alert.alert('Cadastro realizado com sucesso!');
    },
    [navigation, createNumbers],
  );

  const handleCreateNumbers = useCallback(
    async ({ startSequence, times }: CreateNumbersData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          startSequence: Yup.string().required(
            'Informe o início da sequência de números',
          ),
          times: Yup.string().required(
            'Informe a quantidade de números da sequência',
          ),
        });

        await schema.validate(
          { startSequence, times },
          {
            abortEarly: false,
          },
        );

        let alertMessage = '';

        if (Number(times) > 1) {
          const lastPhoneOfSequence = getLastPhonePreview(startSequence, times);

          alertMessage = `De ${startSequence} \n à ${lastPhoneOfSequence}`;
        } else {
          alertMessage = `Apenas ${startSequence}`;
        }

        Alert.alert(
          'Confirme a sequência',
          alertMessage,
          [
            {
              text: 'OK',
              onPress: () => handleStartCreate({ startSequence, times }),
              style: 'default',
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Tente novamente', 'Ocorreu um erro ao fazer cadastro');
      }
    },
    [getLastPhonePreview, handleStartCreate],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleCreateNumbers}>
        <PhoneInput
          label="Primeiro telefone da lista"
          name="startSequence"
          returnKeyType="next"
          onSubmitEditing={() => inputTimesRef.current?.focus()}
        />

        <Input
          ref={inputTimesRef}
          name="times"
          keyboardType="number-pad"
          label="Quantidade de números da sequência"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />

        <Button
          text="Cadastrar números"
          onPress={() => formRef.current?.submitForm()}
          isLoading={loading}
        />
      </Form>
    </Container>
  );
};

export default Create;
