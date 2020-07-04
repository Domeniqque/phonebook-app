import React, { useCallback, useMemo } from 'react';

import Select from '../../components/Select';
import { useLocale } from '../../hooks/locale';
import countries from '../../locale/countries';
import { CountryData } from '../../locale';

import { Container, Title, Content } from './styles';

const Settings: React.FC = () => {
  const {
    language,
    country,
    dialCode,
    changeLanguage,
    changeCountry,
    changeDialCode,
    availableLanguages,
    trans,
  } = useLocale();

  const dialCodes = useMemo(() => {
    return country.dial.map(d => ({
      value: d,
      label: d,
    }));
  }, [country.dial]);

  const handleChangeCountry = useCallback(
    (data: CountryData) => {
      changeCountry(data);
      changeLanguage(data.defaultLanguage);
    },
    [changeLanguage, changeCountry],
  );

  return (
    <Container>
      <Title>{trans('settings.title')}</Title>

      <Content>
        <Select
          label={trans('settings.country.label')}
          placeholder={trans('settings.country.placeholder')}
          values={countries}
          filterable
          defaultValue={country.value}
          onSelect={handleChangeCountry}
        />

        <Select
          label={trans('settings.dialCode.label')}
          placeholder={trans('settings.dialCode.placeholder')}
          values={dialCodes}
          defaultValue={dialCode}
          onSelect={item => changeDialCode(item.value)}
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
