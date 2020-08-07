import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import Select from '../../components/Select';
import { useLocale } from '../../hooks/locale';
import countries from '../../locale/countries';
import { CountryData } from '../../locale';
import { useAlert } from '../../hooks/alert';

import {
  Container,
  Divisor,
  Content,
  BackupBtn,
  BackupBtnText,
  Links,
  LinksTitle,
  LinkButton,
  LinkButtonText,
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
  const navigation = useNavigation();

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

        <BackupBtn onPress={() => navigation.navigate('Backup')}>
          <BackupBtnText>Backup</BackupBtnText>
          <Icon name="chevron-right" size={20} style={{ paddingTop: 4 }} />
        </BackupBtn>

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
