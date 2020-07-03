import React from 'react';

import Select from '../../components/Select';
import { useLang } from '../../hooks/lang';

import { Container, Title, Content } from './styles';

const Settings: React.FC = () => {
  const { language, changeLanguage, availableLanguages, trans } = useLang();

  return (
    <Container>
      <Title>{trans('settings.title')}</Title>

      <Content>
        <Select
          label={trans('settings.language.label')}
          placeholder={trans('settings.language.placeholder')}
          values={availableLanguages}
          defaultValue={language}
          onSelect={item => changeLanguage(item.value)}
        />
      </Content>
    </Container>
  );
};

export default Settings;
