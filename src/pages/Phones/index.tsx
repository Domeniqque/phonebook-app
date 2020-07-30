/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { InteractionManager, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import crashlytics from '@react-native-firebase/crashlytics';
import uuid from '../../utils/uuid';

import Button from '../../components/Button';
import PhoneFilter from '../../components/PhoneFilter';
import FabButton from '../../components/FabButton';
import {
  usePhone,
  PhoneResults,
  PhoneStatus,
  PhoneResult,
} from '../../hooks/phone';
import { useLocale } from '../../hooks/locale';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  Divisor,
  SectionHeader,
  CenteredAddButton,
  CenteredAddButtonText,
  EmptyContentContainer,
} from './styles';

interface PhoneResultGrouped {
  title: string;
  data: PhoneResult[];
}

const Phones: React.FC = () => {
  const [phones, setPhones] = useState<PhoneResults>();
  const [groupedPhones, setGroupedPhones] = useState<PhoneResultGrouped[]>();
  const [status, setStatus] = useState<PhoneStatus>(PhoneStatus.New);
  const [filterLoading, setFilterLoading] = useState(true);
  const [phoneLoading, setPhoneLoading] = useState(true);
  const isEmptyContent = useMemo(() => !phoneLoading && phones?.length === 0, [
    phoneLoading,
    phones?.length,
  ]);

  const navigation = useNavigation();
  const { language, trans } = useLocale();
  const { findByStatus } = usePhone();

  useEffect(() => {
    setPhoneLoading(true);

    function loadPhones(): void {
      crashlytics().log('Listando telefones');
      setGroupedPhones([] as PhoneResultGrouped[]);

      InteractionManager.runAfterInteractions(async () => {
        const phoneRawList = await findByStatus(status);

        if (status !== PhoneStatus.New) {
          const dateLocale = language === 'pt_BR' ? ptBR : enUS;

          const map = new Map<string, PhoneResult[]>();

          phoneRawList.forEach(item => {
            const updatedAtKey = format(item.updated_at, 'ccc, dd MMM yyyy', {
              locale: dateLocale,
            });

            const collection = map.get(updatedAtKey);

            if (!collection) {
              map.set(updatedAtKey, [item]);
            } else {
              collection.push(item);
            }
          });

          const result = Array.from(map, ([title, data]) => ({
            title,
            data,
          })) as PhoneResultGrouped[];

          setGroupedPhones(result);
        } else {
          setPhones(phoneRawList);
        }

        setFilterLoading(false);
        setPhoneLoading(false);
      });
    }

    loadPhones();

    const unsubscribe = navigation.addListener('focus', loadPhones);

    return unsubscribe;
  }, [navigation, findByStatus, status, language]);

  const renderPlaceholderItems = useCallback(() => {
    const items = [];

    for (let index = 0; index < 9; index++) {
      items.push(<PlaceholderLine height={30} key={`${index}-ph-phone`} />);
    }

    return items;
  }, []);

  const handleChangeStatus = useCallback((data: PhoneStatus) => {
    setPhoneLoading(true);
    setStatus(data);
  }, []);

  if (phoneLoading) {
    return (
      <Container>
        <PhoneFilter
          onStatusChange={handleChangeStatus}
          loading={filterLoading}
        />

        <Placeholder
          Animation={props => <Fade {...props} duration={500} />}
          style={{ paddingRight: 16, paddingLeft: 16, marginTop: 15 }}
        >
          {renderPlaceholderItems()}
        </Placeholder>
      </Container>
    );
  }

  if (isEmptyContent && status === PhoneStatus.New) {
    return (
      <Container>
        <PhoneFilter
          onStatusChange={handleChangeStatus}
          loading={filterLoading}
        />

        <EmptyContentContainer>
          <Button
            text={trans('phones.emptyContentButton')}
            onPress={() => navigation.navigate('CreatePhone')}
            icon="plus"
            outlined
          />
        </EmptyContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <PhoneFilter
        onStatusChange={handleChangeStatus}
        loading={filterLoading}
      />

      {status !== PhoneStatus.New && groupedPhones ? (
        <SectionList
          style={{ paddingRight: 16, paddingLeft: 16, paddingTop: 25 }}
          sections={groupedPhones}
          keyExtractor={item => item?.id || uuid()}
          renderItem={({ item }) => (
            <>
              <Divisor />
              <PhoneListItem
                onPress={() => {
                  navigation.navigate('ShowPhone', { id: item?.id });
                }}
              >
                <PhoneListItemNumber>{item?.nationalValue}</PhoneListItemNumber>
                <Icon name="chevron-right" size={28} />
              </PhoneListItem>
            </>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader>{title}</SectionHeader>
          )}
        />
      ) : (
        <PhoneList
          data={phones}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Divisor />}
          renderItem={({ item }) => (
            <PhoneListItem
              onPress={() => {
                navigation.navigate('ShowPhone', { id: item.id });
              }}
            >
              <PhoneListItemNumber>{item.nationalValue}</PhoneListItemNumber>
              <Icon name="chevron-right" size={28} />
            </PhoneListItem>
          )}
        />
      )}

      <FabButton onPress={() => navigation.navigate('CreatePhone')} />
    </Container>
  );
};

export default Phones;
