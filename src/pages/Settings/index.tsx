import React from 'react';

import Select from '../../components/Select';

import { Container, Title, Content } from './styles';

const languages = [
  {
    label: 'Português',
    value: 'BR',
  },
  {
    label: 'Inglês',
    value: 'EN',
  },
  {
    label: 'Espanhol',
    value: 'ES',
  },
];

const Settings: React.FC = () => {
  return (
    <Container>
      <Title>Ajustes</Title>

      <Content>
        <Select
          values={languages}
          placeholder="Selecione um idioma"
          defaultValue="EN"
          onSelect={item => console.log(item)}
        />
      </Content>
    </Container>
  );
};

export default Settings;
