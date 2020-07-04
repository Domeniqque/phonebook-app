import React, { useMemo, useCallback } from 'react';

import Select from '../../components/Select';
import { useLang } from '../../hooks/lang';
import countries from '../../locale/countries';

import { Container, Title, Content } from './styles';

interface CountryData {
  label: string;
  name: string;
  value: string;
  language: string;
  defaultLanguage: string;
}

const Settings: React.FC = () => {
  const { language, changeLanguage, availableLanguages, trans } = useLang();

  const handleChangeCountry = useCallback(
    (country: CountryData) => {
      changeLanguage(country.defaultLanguage);
    },
    [changeLanguage],
  );

  return (
    <Container>
      <Title>{trans('settings.title')}</Title>

      <Content>
        <Select
          label={trans('settings.countryCode.label')}
          placeholder={trans('settings.countryCode.placeholder')}
          values={countries}
          filterable
          // defaultValue={language}
          onSelect={handleChangeCountry}
        />

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
