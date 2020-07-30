/* eslint-disable import/no-duplicates */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import crashlytics from '@react-native-firebase/crashlytics';
import Icon from 'react-native-vector-icons/Feather';
import { ptBR, enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import {
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from 'react-native';
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
  NoteContent,
  DeleteNote,
} from './styles';

interface InterestedNotesProps {
  interestedId: string | undefined;
  interestedName: string | undefined;
}

type NoteResult = Realm.Results<NoteProps & Realm.Object>;

async function loadNotes(interestedId: string): Promise<NoteResult> {
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
  const [notes, setNotes] = useState<NoteResult>();
  const [loading, setLoading] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const { trans, language } = useLocale();
  const { alert, success } = useAlert();

  useEffect(() => {
    if (!interestedId) return;

    loadNotes(interestedId).then(data => {
      setNotes(data as NoteResult);
      setLoading(false);
    });
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

        InteractionManager.runAfterInteractions(async () => {
          const realm = await getRealm();

          realm.write(async () => {
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

            success();
            setAddMode(false);
          });
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

        realm.write(() => {
          const note = realm
            .objects<NoteProps>('Note')
            .filtered(`id = "${id}"`);

          if (note) {
            realm.delete(note);
          }

          success();
        });
      }

      alert({
        title: trans('interested.notes.titleDelete'),
        text: text.length < 110 ? text : `${text.substr(0, 110)}...`,
        confirmText: trans('interested.notes.confirmDelete'),
        cancelText: trans('interested.notes.cancelDelete'),
        onConfirm: (): void => {
          InteractionManager.runAfterInteractions(destroy);
        },
      });
    },
    [success, alert, trans],
  );

  const formatDate = useCallback(
    (noteDate: Date) => {
      const dateLocale = language === 'pt_BR' ? ptBR : enUS;

      return format(noteDate, 'cccc, dd MMM yyyy', {
        locale: dateLocale,
      });
    },
    [language],
  );

  // Form Create
  if (addMode) {
    return (
      <FullModal
        title={trans('interested.notes.addTitle')}
        subtitle={interestedName}
        onClose={() => setAddMode(false)}
        visible={addMode}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Form
            ref={formRef}
            onSubmit={handleSaveNote}
            style={{ marginTop: 25 }}
          >
            <Input
              name="note"
              autoFocus
              height={200}
              numberOfLines={30}
              textAlignVertical="top"
              multiline
            />

            <DatePicker onSelect={setDate} />

            <Button
              onPress={() => formRef.current?.submitForm()}
              icon="save"
              text={trans('interested.notes.btnSave')}
            />
          </Form>
        </KeyboardAvoidingView>
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
        {loading ? (
          <Placeholder Animation={Fade}>
            <PlaceholderLine height={12} width={35} />
            <PlaceholderLine height={18} width={86} />
            <PlaceholderLine height={18} width={70} />
          </Placeholder>
        ) : (
          notes &&
          notes.map(note => (
            <NoteItem key={note.id}>
              <NoteContent>
                <NoteDate>{formatDate(note.date)}</NoteDate>
                <NoteText>{note.text}</NoteText>
              </NoteContent>
              <DeleteNote onPress={() => handleDeleteNote(note.id, note.text)}>
                <Icon name="trash" size={20} color="#000" />
              </DeleteNote>
            </NoteItem>
          ))
        )}
      </Content>
    </Container>
  );
};

export default InterestedNotes;
