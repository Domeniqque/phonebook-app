import React, { useState, useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import crashlytics from '@react-native-firebase/crashlytics';

import FullModal from '../FullModal';

import Input from '../Input';
import Button from '../Button';
import DatePicker from '../DatePicker';
import { useLocale } from '../../hooks/locale';
import { useAlert } from '../../hooks/alert';
import getValidationErrors from '../../utils/getValidationErrors';
import getRealm from '../../services/realm';
import { InterestedProps } from '../../schemas/InterestedSchema';

import { Container, Title, AddButton, AddButtonText, Header } from './styles';

interface InterestedNotesProps {
  interestedId: string | undefined;
  interestedName: string | undefined;
}

const InterestedNotes: React.FC<InterestedNotesProps> = ({
  interestedId,
  interestedName,
}) => {
  const [addMode, setAddMode] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const formRef = useRef<FormHandles>(null);

  const { trans } = useLocale();
  const { alert, success } = useAlert();

  const handleSaveNote = useCallback(
    async ({ note }) => {
      if (!interestedId) return;
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object({
          note: Yup.string().required(trans('interested.validation.note')),
        });

        await schema.validate({ note }, { abortEarly: false });

        const data = {
          text: note,
          pinned: false,
          date,
        };

        console.log(data);

        const realm = await getRealm();

        realm.write(() => {
          const interested = realm.objectForPrimaryKey<InterestedProps>(
            'Interested',
            interestedId,
          );

          interested?.notes.push(data);

          setAddMode(false);
          success();
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
    [alert, trans, date, interestedId],
  );

  if (addMode) {
    return (
      <FullModal
        title={trans('interested.notes.addTitle')}
        subtitle={interestedName}
        onClose={() => setAddMode(false)}
        visible={addMode}
      >
        <Form ref={formRef} onSubmit={handleSaveNote} style={{ marginTop: 25 }}>
          <Input
            name="note"
            autoFocus
            height={200}
            numberOfLines={30}
            multiline
          />

          <DatePicker onSelect={setDate} />

          <Button
            onPress={() => formRef.current?.submitForm()}
            icon="save"
            text={trans('interested.notes.btnSave')}
          />
        </Form>
      </FullModal>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{trans('interested.notes.title')}</Title>

        <AddButton onPress={() => setAddMode(true)}>
          <AddButtonText>{trans('interested.notes.btnAdd')}</AddButtonText>
        </AddButton>
      </Header>
    </Container>
  );
};

export default InterestedNotes;
