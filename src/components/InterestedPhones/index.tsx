import { Modal, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';
import crashlytics from '@react-native-firebase/crashlytics';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { PhoneResults, usePhone } from '../../hooks/phone';
import { useInterested } from '../../hooks/interested';
import { useAlert } from '../../hooks/alert';
import { useLocale } from '../../hooks/locale';
import getRealm from '../../services/realm';
import { PhoneProps } from '../../schemas/PhoneSchema';
import getValidationErrors from '../../utils/getValidationErrors';
import PhoneInput, { PhoneInputRef } from '../PhoneInput';
import Button from '../Button';

import {
  Container,
  PhonesNumbersHeader,
  PhoneNumbersAdd,
  PhoneNumbersAddText,
  PhonesNumbersTitle,
  PhonesNumbersContainer,
  PhoneNumberItem,
  PhoneNumberItemBtn,
  PhoneNumberItemText,
  PhoneNumberItemDelete,
  AddContent,
  AddHeader,
  AddTitle,
  AddSubtitle,
  AddCloseButton,
} from './styles';

interface InterestedProps {
  interestedId: string | undefined;
  interestedName: string | undefined;
}

const InterestedPhones: React.FC<InterestedProps> = ({
  interestedId,
  interestedName,
}) => {
  const [phones, setPhones] = useState<PhoneResults>();
  const [addMode, setAddMode] = useState(false);

  const phoneNumberRef = useRef<PhoneInputRef>(null);
  const formRef = useRef<FormHandles>(null);

  const { trans, country } = useLocale();
  const { alert, success } = useAlert();
  const { destroy } = usePhone();
  const { addInterestedPhone } = useInterested();

  useEffect(() => {
    async function loadPhones(): Promise<void> {
      if (!interestedId) return;

      const realm = await getRealm();

      const phonesData = realm
        .objects<PhoneProps>('Phones')
        .filtered(`interested_id = "${interestedId}"`);

      setPhones(phonesData);
    }

    loadPhones();
  }, [interestedId]);

  const handleAddPhone = useCallback(
    async ({ phoneNumber }, { reset }) => {
      crashlytics().log('Add telefone para interessado');

      try {
        const phoneInstance = phoneNumberRef.current?.getPhoneInstance();

        const schema = Yup.object({
          phoneNumber: Yup.string()
            .test(
              'is-phone-valid',
              trans('interested.validation.invalidPhone'),
              () => !!phoneInstance?.isValid,
            )
            .required(trans('interested.validation.phoneNumber')),
        });

        await schema.validate({ phoneNumber }, { abortEarly: false });

        if (phoneNumberRef.current && interestedId) {
          setAddMode(false);
          success();

          await addInterestedPhone(phoneInstance, interestedId);

          reset();
        }
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
    [alert, success, trans, addInterestedPhone, interestedId],
  );

  const handleDeletePhone = useCallback(
    (phone: PhoneProps) => {
      alert({
        title: trans('phones.show.deleteTitle'),
        text: phone.nationalValue,
        confirmText: trans('phones.show.deleteOk'),
        cancelText: trans('phones.show.deleteCancel'),
        onConfirm: () => {
          crashlytics().log('Deletando um número');

          destroy(phone.id)
            .then(() => {
              success();
            })
            .catch(error => crashlytics().recordError(error));
        },
      });
    },
    [destroy, alert, success, trans],
  );

  if (addMode) {
    return (
      <Modal transparent={false} visible>
        <SafeAreaView>
          <AddContent>
            <AddHeader>
              <AddTitle>{trans('interestedPhones.modalTitle')}</AddTitle>
              <AddSubtitle>{interestedName}</AddSubtitle>
            </AddHeader>

            <AddCloseButton onPress={() => setAddMode(false)}>
              <Icon name="x" size={36} color="#000" />
            </AddCloseButton>

            <Form
              ref={formRef}
              onSubmit={handleAddPhone}
              style={{ marginTop: 20 }}
            >
              <PhoneInput
                ref={phoneNumberRef}
                name="phoneNumber"
                countryCode={country.value}
                autoFocus
                keyboardType="number-pad"
              />

              <Button
                icon="plus"
                text={trans('interestedPhones.addButton')}
                onPress={() => formRef.current?.submitForm()}
              />
            </Form>
          </AddContent>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Container>
      <PhonesNumbersHeader>
        <PhonesNumbersTitle>{trans('interested.show.call')}</PhonesNumbersTitle>

        <PhoneNumbersAdd>
          <PhoneNumbersAddText onPress={() => setAddMode(true)}>
            {trans('interested.show.btnAddPhone')}
          </PhoneNumbersAddText>
        </PhoneNumbersAdd>
      </PhonesNumbersHeader>

      <PhonesNumbersContainer>
        {phones &&
          phones.map(item => (
            <PhoneNumberItem key={item.id}>
              <PhoneNumberItemBtn>
                <PhoneNumberItemText>{item.nationalValue}</PhoneNumberItemText>
              </PhoneNumberItemBtn>

              <PhoneNumberItemDelete onPress={() => handleDeletePhone(item)}>
                <Icon name="trash" size={20} color="#000" />
              </PhoneNumberItemDelete>
            </PhoneNumberItem>
          ))}
      </PhonesNumbersContainer>
    </Container>
  );
};

export default InterestedPhones;
