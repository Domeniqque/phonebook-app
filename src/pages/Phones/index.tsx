/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SectionList, Share } from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
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
import { PhoneStackProps } from '../../routes/phones.routes';
import { shareApp } from '../../utils/shareApp';

import {
  Container,
  PhoneList,
  PhoneListItem,
  PhoneListItemNumber,
  Divisor,
  SectionHeader,
  EmptyContentContainer,
  ShareButton,
} from './styles';

interface PhoneResultGrouped {
  title: string;
  data: PhoneResult[];
}

type PhoneIndexProps = RouteProp<PhoneStackProps, 'Phones'>;

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
  const { params } = useRoute<PhoneIndexProps>();
  const { language, trans } = useLocale();
  const { findByStatus } = usePhone();

  const loadPhones = useCallback(async () => {
    try {
      crashlytics().log('Listando telefones');
      setGroupedPhones([] as PhoneResultGrouped[]);

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
    } catch (err) {
      crashlytics().recordError(err);
      setFilterLoading(false);
      setPhoneLoading(false);
    }
  }, [findByStatus, status, language]);

  useFocusEffect(
    useCallback(() => {
      loadPhones();
    }, [loadPhones]),
  );

  useEffect(() => {
    const shareText = trans('shareAppText');

    navigation.setOptions({
      headerRight: () => (
        <ShareButton onPress={() => shareApp(shareText)}>
          <Icon name="share-2" size={25} color="#000" />
        </ShareButton>
      ),
    });
  }, [navigation, trans]);

  useEffect(() => {
    if (params?.shareApp) {
      shareApp(trans('shareAppText'));
    }
  }, [params?.shareApp, trans]);

  const handleChangeStatus = useCallback(
    (data: PhoneStatus) => {
      setStatus(data);
      loadPhones();
    },
    [loadPhones],
  );

  if (phoneLoading) {
    return (
      <Container>
        <PhoneFilter
          onStatusChange={handleChangeStatus}
          loading={filterLoading}
        />

        <Placeholder
          style={{ paddingRight: 16, paddingLeft: 16, marginTop: 20 }}
        >
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
          <PlaceholderLine height={25} />
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
          style={{ paddingRight: 16, paddingLeft: 16, paddingTop: 16 }}
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
