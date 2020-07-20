import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import FullModal from '../FullModal';

import { Container, Title, AddButton, AddButtonText, Header } from './styles';
import Input from '../Input';
import Button from '../Button';
import DatePicker from '../DatePicker';

interface InterestedProps {
  interestedId: string | undefined;
  interestedName: string | undefined;
}

const InterestedComments: React.FC<InterestedProps> = ({ interestedName }) => {
  const [addMode, setAddMode] = useState(false);
  const formRef = useRef<FormHandles>(null);

  if (addMode) {
    return (
      <FullModal
        title="Adicionar comentário"
        subtitle={interestedName}
        onClose={() => setAddMode(false)}
        visible={addMode}
      >
        <Form ref={formRef} onSubmit={() => null} style={{ marginTop: 25 }}>
          <Input
            name="comment"
            autoFocus
            height={200}
            numberOfLines={30}
            multiline
          />

          <DatePicker />

          <Button icon="save" text="Salvar comentário" />
        </Form>
      </FullModal>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Comentários</Title>

        <AddButton onPress={() => setAddMode(true)}>
          <AddButtonText>adicionar</AddButtonText>
        </AddButton>
      </Header>
    </Container>
  );
};

export default InterestedComments;
