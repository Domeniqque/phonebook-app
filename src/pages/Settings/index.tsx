import React from 'react';

import Select from '../../components/Select';
import { useLang } from '../../hooks/lang';

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
  const { language, changeLanguage } = useLang();

  return (
    <Container>
      <Title>Ajustes</Title>

      <Content>
        <Select
          values={languages}
          placeholder="Selecione um idioma"
          defaultValue={language}
          onSelect={item => changeLanguage(item.value)}
        />
      </Content>
    </Container>
  );
};

export default Settings;
