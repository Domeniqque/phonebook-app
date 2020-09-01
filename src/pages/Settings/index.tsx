import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { shareApp } from '../../utils/shareApp';
import Select from '../../components/Select';
import { useLocale } from '../../hooks/locale';
import countries from '../../locale/countries';
import { CountryData } from '../../locale';
import { useAlert } from '../../hooks/alert';

import {
  Container,
  Title,
  Content,
  Links,
  LinksTitle,
  LinkButton,
  LinkButtonText,
  Divisor,
  ShareButton,
  ShareText,
} from './styles';

const Settings: React.FC = () => {
  const {
    language,
    country,
    changeLanguage,
    changeCountry,
    availableLanguages,
    trans,
  } = useLocale();

  const { success } = useAlert();

  const handleChangeCountry = useCallback(
    (data: CountryData) => {
      success();
      changeCountry(data);
      changeLanguage(data.defaultLanguage);
    },
    [changeLanguage, changeCountry, success],
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

        <Divisor />

        <Select
          label={trans('settings.language.label')}
          placeholder={trans('settings.language.placeholder')}
          values={availableLanguages}
          defaultValue={language}
          onSelect={item => {
            changeLanguage(item.value);
            success();
          }}
        />

        <Divisor />

        <ShareButton onPress={() => shareApp(trans('shareAppText'))}>
          <ShareText>Indicar para um amigo</ShareText>
          <Icon name="chevron-right" size={28} />
        </ShareButton>

        <Divisor />

        <Links>
          <LinksTitle>LINKS</LinksTitle>
          <LinkButton
            onPress={() => {
              Linking.openURL('https://phonepreaching.vercel.app/privacy');
            }}
          >
            <LinkButtonText>{trans('settings.privacy')}</LinkButtonText>
          </LinkButton>

          <LinkButton
            onPress={() => {
              Linking.openURL('https://phonepreaching.vercel.app');
            }}
          >
            <LinkButtonText>{trans('settings.site')}</LinkButtonText>
          </LinkButton>
        </Links>
      </Content>
    </Container>
  );
};

export default Settings;
