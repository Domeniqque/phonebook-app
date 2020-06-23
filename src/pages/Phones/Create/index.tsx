import React, { useCallback, useRef, useState } from 'react';
import { Form, FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { usePhone } from '../../../hooks/phone';
import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/Button';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';

import { Container } from './styles';

interface CreateNumbersData {
  firstNumber: string;
  lastNumber: string;
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const firstNumberRef = useRef<PhoneInputRef>(null);
  const lastNumberRef = useRef<PhoneInputRef>(null);

  const { addSequence } = usePhone();

  const [loading, setLoading] = useState(false);

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

        const result = addSequence({
          firstNumber: firstNumberRef.current?.getPhoneInstance(),
          lastNumber: lastNumberRef.current?.getPhoneInstance(),
        });

        console.log(result);
      } catch (err) {
        if (err instanceof Yup.ValidationError)
          formRef.current?.setErrors(getValidationErrors(err));
        else console.error(err);
      }

      setLoading(false);
    },
    [addSequence],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleCreateNumbers}>
        <PhoneInput
          ref={firstNumberRef}
          label="Primeiro número"
          name="firstNumber"
          returnKeyType="next"
          onSubmitEditing={() => lastNumberRef.current?.focus()}
        />

        <PhoneInput
          ref={lastNumberRef}
          label="Último número"
          name="lastNumber"
          returnKeyType="next"
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
