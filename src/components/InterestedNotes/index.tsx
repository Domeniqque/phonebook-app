import React, { useState, useRef, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import crashlytics from '@react-native-firebase/crashlytics';
import Icon from 'react-native-vector-icons/Feather';

import FullModal from '../FullModal';

import Input from '../Input';
import Button from '../Button';
import DatePicker from '../DatePicker';
import { useLocale } from '../../hooks/locale';
import { useAlert } from '../../hooks/alert';
import getValidationErrors from '../../utils/getValidationErrors';
import getRealm from '../../services/realm';
import { InterestedProps } from '../../schemas/InterestedSchema';
import { NoteProps } from '../../schemas/NoteSchema';
import uuid from '../../utils/uuid';

import {
  Container,
  Title,
  AddButton,
  AddButtonText,
  Header,
  Content,
  NoteItem,
  NoteText,
  NoteDate,
  DeleteNote,
} from './styles';

interface InterestedNotesProps {
  interestedId: string | undefined;
  interestedName: string | undefined;
}

type NoteResult = Realm.Results<NoteProps & Realm.Object>;

async function loadNotes(
  interestedId: string | undefined,
): Promise<NoteResult> {
  if (!interestedId) return {} as NoteResult;

  const realm = await getRealm();

  const data = realm
    .objects<NoteProps>('Note')
    .filtered(`interested.id = "${interestedId}"`)
    .sorted('date', true);

  return data;
}

const InterestedNotes: React.FC<InterestedNotesProps> = ({
  interestedId,
  interestedName,
}) => {
  const [addMode, setAddMode] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<NoteResult>({} as NoteResult);

  const formRef = useRef<FormHandles>(null);

  const { trans } = useLocale();
  const { alert, success } = useAlert();

  useEffect(() => {
    loadNotes(interestedId).then(setNotes);
  }, [interestedId]);

  const handleSaveNote = useCallback(
    async ({ note }) => {
      if (!interestedId) return;
      formRef.current?.setErrors({});

      crashlytics().log('Cadastrando uma nota');

      try {
        const schema = Yup.object({
          note: Yup.string().required(trans('interested.validation.note')),
        });

        await schema.validate({ note }, { abortEarly: false });

        const realm = await getRealm();

        realm.write(async () => {
          success();

          const interested = realm.objectForPrimaryKey<InterestedProps>(
            'Interested',
            interestedId,
          );

          interested?.notes.push({
            id: uuid(),
            text: note,
            pinned: false,
            date,
          });

          setAddMode(false);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError)
          formRef.current?.setErrors(getValidationErrors(err));
        else {
          setAddMode(false);
          crashlytics().recordError(err);

          alert({
            title: trans('defaultError.title'),
            text: trans('defaultError.text'),
            confirmText: 'OK',
          });
        }
      }
    },
    [alert, trans, date, success, interestedId],
  );

  const handleDeleteNote = useCallback(
    async (id: string, text: string) => {
      async function destroy(): Promise<void> {
        const realm = await getRealm();

        success();
        realm.write(() => {
          const note = realm
            .objects<NoteProps>('Note')
            .filtered(`id = "${id}"`);

          if (note) {
            realm.delete(note);
          }
        });
      }

      alert({
        title: 'Deseja excluir esta nota?',
        text: text.length < 110 ? text : `${text.substr(0, 110)}...`,
        confirmText: 'Sim, excluir',
        cancelText: 'Cancelar',
        onConfirm: (): void => {
          destroy();
        },
      });
    },
    [success, alert],
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

      <Content>
        {notes &&
          notes.map(note => (
            <NoteItem key={note.id}>
              <NoteText>{note.text}</NoteText>
              <DeleteNote onPress={() => handleDeleteNote(note.id, note.text)}>
                <Icon name="trash" size={20} color="#000" />
              </DeleteNote>
            </NoteItem>
          ))}
      </Content>
    </Container>
  );
};

export default InterestedNotes;
