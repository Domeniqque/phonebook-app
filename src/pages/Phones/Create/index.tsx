import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { InteractionManager, LayoutAnimation } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Yup from 'yup';

import { PhoneNumber } from 'libphonenumber-js';
import getValidationErrors from '../../../utils/getValidationErrors';
import PhoneInput, { PhoneInputRef } from '../../../components/PhoneInput';
import Button from '../../../components/Button';
import { usePhone } from '../../../hooks/phone';
import { useAlert } from '../../../hooks/alert';
import { useLocale } from '../../../hooks/locale';
import Input, { InputRef } from '../../../components/Input';
import getLocalePhonePlaceholder from '../../../utils/getLocalePhonePlaceholder';
import { parsePhone } from '../../../utils/parsePhoneNumber';
import getNumberInstance from '../../../utils/getNumberInstance';

import {
  Container,
  Tip,
  TipText,
  ToggleModeLabel,
  ToggleMode,
  ToggleModeBtn,
  ToggleModeText,
  LastNumberPreview,
} from './styles';

interface CreateNumbersData {
  firstNumber: string;
  lastNumber: string;
  quantity?: string;
}

enum AddMode {
  LAST_NUMBER,
  QUANTITY,
}

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const firstNumberRef = useRef<PhoneInputRef>(null);
  const lastNumberRef = useRef<PhoneInputRef>(null);
  const quantityRef = useRef<InputRef>(null);

  const [addMode, setAddMode] = useState<AddMode>(AddMode.LAST_NUMBER);
  const [firstNumber, setFirstNumber] = useState('');
  const [lastNumber, setLastNumber] = useState<PhoneNumber | undefined>();

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

      try {
        const schema = Yup.object({
          quantityMode: Yup.boolean(),
          firstNumber: Yup.string().required(
            trans('phones.create.validation.firstNumberRequired'),
          ),
          quantity: Yup.string().when('quantityMode', {
            is: true,
            then: Yup.string().required(
              trans('phones.create.validation.quantity'),
            ),
          }),
          lastNumber: Yup.string().when('quantityMode', {
            is: false,
            then: Yup.string().required(
              trans('phones.create.validation.lastNumberRequired'),
            ),
          }),
        });

        await schema.validate(
          { ...formData, quantityMode: addMode === AddMode.QUANTITY },
          { abortEarly: false },
        );

        InteractionManager.runAfterInteractions(() => {
          addSequence({
            firstNumber: firstNumberRef.current?.getPhoneInstance(),
            lastNumber:
              addMode === AddMode.LAST_NUMBER
                ? lastNumberRef.current?.getPhoneInstance()
                : lastNumber,
            callOnSuccess: () => {
              success();
              navigation.navigate('Phones');
            },
          });
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
      }
    },
    [addSequence, navigation, success, alert, trans, addMode, lastNumber],
  );

  const toggleAddMode = useCallback(() => {
    if (addMode === AddMode.LAST_NUMBER) {
      setAddMode(AddMode.QUANTITY);
      setTimeout(() => quantityRef.current?.focus(), 100);
    } else {
      setAddMode(AddMode.LAST_NUMBER);
      setTimeout(() => lastNumberRef.current?.focus(), 100);
    }
  }, [addMode]);

  const generateLastNumber = useCallback(
    (quantity: string) => {
      if (firstNumber) {
        const { number, areaCode } = parsePhone(firstNumber);

        const interator = number + Number(quantity) - 1;
        const lastNumberIterator = interator >= number ? interator : number;

        const numberInstance = getNumberInstance(
          `${areaCode}${lastNumberIterator}`,
          country.value,
        );

        setLastNumber(numberInstance);
      }
    },
    [firstNumber, country.value],
  );

  return (
    <Container keyboardShouldPersistTaps="always">
      <Tip>
        <TipText>{trans('phones.create.tip')}</TipText>
      </Tip>

      <Form
        ref={formRef}
        onSubmit={handleCreateNumbers}
        style={{ flex: 1, marginBottom: 60 }}
        initialData={{ quantity: '1' }}
      >
        <PhoneInput
          ref={firstNumberRef}
          label={trans('phones.create.label.first')}
          name="firstNumber"
          countryCode={country.value}
          returnKeyType="next"
          onSubmitEditing={() => lastNumberRef.current?.focus()}
          placeholder={placeholder}
          onChangeText={setFirstNumber}
          accessibilityLabel="Type your first phone number"
        />

        <ToggleModeLabel>{trans('phones.create.label.addBy')}</ToggleModeLabel>

        <ToggleMode>
          <ToggleModeBtn
            selected={addMode === AddMode.LAST_NUMBER}
            onPress={toggleAddMode}
          >
            <ToggleModeText selected={addMode === AddMode.LAST_NUMBER}>
              {trans('phones.create.label.btnLast')}
            </ToggleModeText>
          </ToggleModeBtn>

          <ToggleModeBtn
            onPress={toggleAddMode}
            selected={addMode === AddMode.QUANTITY}
          >
            <ToggleModeText selected={addMode === AddMode.QUANTITY}>
              {trans('phones.create.label.btnQtd')}
            </ToggleModeText>
          </ToggleModeBtn>
        </ToggleMode>

        {addMode === AddMode.QUANTITY ? (
          <>
            <Input
              ref={quantityRef}
              name="quantity"
              keyboardType="number-pad"
              label={trans('phones.create.label.qtd')}
              maxLength={4}
              selectTextOnFocus={false}
              onChangeText={generateLastNumber}
              accessibilityLabel="Type your first phone number"
              returnKeyType="done"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            {lastNumber && (
              <LastNumberPreview>
                {`${trans(
                  'phones.create.label.lastNumberPreview',
                )} ${lastNumber?.formatNational()}`}
              </LastNumberPreview>
            )}
          </>
        ) : (
          <PhoneInput
            ref={lastNumberRef}
            label={trans('phones.create.label.last')}
            name="lastNumber"
            countryCode={country.value}
            returnKeyType="done"
            onSubmitEditing={() => formRef.current?.submitForm()}
            placeholder={placeholder}
          />
        )}

        <Button
          text={trans('phones.create.button')}
          icon="save"
          style={{ marginTop: 10 }}
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
    </Container>
  );
};

export default Create;
