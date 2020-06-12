import React, { useCallback, useRef } from 'react';
import { TextInput, Alert } from 'react-native';
import { Form, FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import PhoneInput from '../../../components/PhoneInput';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container } from './styles';

interface CreateNumbersData {
  startSequence: string;
  times: string;
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputTimesRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleCreateNumbers = useCallback(
    async ({ startSequence, times }: CreateNumbersData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          startSequence: Yup.string()
            .matches(
              /\(\d{2}\)\s\d{5}-\d{4}/,
              'Formato inválido. Verifique o prefixo e se possui o 9 antes do número',
            )
            .required('Informe o início da sequência de números'),
          times: Yup.number()
            .min(1, 'Informe um número positivo válido')
            .max(1000, 'Crie sequências de no máximo 1000 números'),
        });

        await schema.validate(
          { startSequence, times },
          {
            abortEarly: false,
          },
        );

        console.log({ startSequence, times });

        Alert.alert('Cadastro realizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Whoops!',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    },
    [navigation],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleCreateNumbers}>
        <PhoneInput
          name="startSequence"
          placeholder="Primeiro número telefônico"
          returnKeyType="next"
          onSubmitEditing={() => inputTimesRef.current?.focus()}
        />

        <Input
          ref={inputTimesRef}
          name="times"
          keyboardType="number-pad"
          placeholder="Quantidade de números da sequência"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />

        <Button
          text="Cadastrar números"
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
    </Container>
  );
};

export default Create;
