import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import crashlytics from '@react-native-firebase/crashlytics';

import { useLocale } from '../../../hooks/locale';
import { InterestedStackProps } from '../../../routes/interested.routes';
import { useInterested, InterestedResult } from '../../../hooks/interested';
import { useAlert } from '../../../hooks/alert';
import getRealm from '../../../services/realm';
import InterestedPhones from '../../../components/InterestedPhones';
import InterestedNotes from '../../../components/InterestedNotes';

import {
  Container,
  SectionDetails,
  SectionBio,
  SectionBioName,
  SectionBioComplement,
  EditBioButton,
  DeleteButton,
} from './styles';

type InterestedScreenProps = RouteProp<InterestedStackProps, 'ShowInterested'>;

const Show: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [interested, setInterested] = useState<InterestedResult>(
    {} as InterestedResult,
  );

  const { success, alert } = useAlert();
  const { params } = useRoute<InterestedScreenProps>();
  const navigation = useNavigation();
  const { findById } = useInterested();
  const { trans } = useLocale();

  useEffect(() => {
    async function loadInterested(): Promise<void> {
      const data = await findById(params.id);

      if (data) setInterested(data);

      setTimeout(() => setLoading(false), 200);
    }

    loadInterested();

    const unsubscribe = navigation.addListener('focus', loadInterested);

    return unsubscribe;
  }, [findById, params.id, navigation]);

  const handleDeleteInterested = useCallback(() => {
    const destroy = async (): Promise<void> => {
      if (!interested?.id) return;

      const realm = await getRealm();

      success();
      navigation.navigate('IndexInterested');

      realm.write(() => {
        const interestedData = realm
          .objects('Interested')
          .filtered(`id = "${interested.id}"`);

        const interestedPhones = realm
          .objects('Phones')
          .filtered(`interested_id = "${interested.id}"`);

        realm.delete(interestedPhones);
        realm.delete(interestedData);
      });
    };

    alert({
      title: trans('interested.show.deleteTitle'),
      text: trans('interested.show.deleteConfimText'),
      confirmText: trans('interested.show.deleteOk'),
      cancelText: trans('interested.show.deleteCancel'),
      onConfirm: () => {
        crashlytics().log('Deletando um número');

        destroy().catch(error => {
          crashlytics().recordError(error);
        });
      },
    });
  }, [interested?.id, navigation, alert, trans, success]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton onPress={handleDeleteInterested}>
          <Icon name="trash" size={25} color="#000" />
        </DeleteButton>
      ),
    });
  }, [navigation, handleDeleteInterested]);

  const interestedComplement = useMemo(() => {
    const gender = interested?.gender
      ? trans(`gender.${interested?.gender}`)
      : '';

    const lifeStages = interested?.lifeStage
      ? trans(`lifeStages.${interested?.lifeStage}`)
      : '';

    const data = [gender, lifeStages, interested?.address];

    return data.filter(a => a).join(', ');
  }, [interested?.gender, interested?.address, interested?.lifeStage, trans]);

  return (
    <Container>
      <SectionDetails>
        {loading ? (
          <Placeholder Animation={Fade}>
            <PlaceholderLine height={20} width={60} />
            <PlaceholderLine height={14} width={40} />
          </Placeholder>
        ) : (
          <>
            <SectionBio>
              <SectionBioName>
                {interested?.name || trans('interested.show.unnamed')}
              </SectionBioName>
              <SectionBioComplement>
                {interestedComplement}
              </SectionBioComplement>
            </SectionBio>

            <EditBioButton
              onPress={() => {
                navigation.navigate('EditInterested', { id: interested?.id });
              }}
            >
              <Icon name="edit-2" size={20} color="#000" />
            </EditBioButton>
          </>
        )}
      </SectionDetails>

      <InterestedPhones
        interestedId={interested?.id}
        interestedName={interested?.name || trans('interested.show.unnamed')}
      />

      <InterestedNotes
        interestedId={interested?.id}
        interestedName={interested?.name || trans('interested.show.unnamed')}
      />
    </Container>
  );
};

export default Show;
