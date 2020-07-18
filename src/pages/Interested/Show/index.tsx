import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import { useLocale } from '../../../hooks/locale';
import Select from '../../../components/Select';
import { InterestedStackProps } from '../../../routes/interested.routes';
import { useInterested, InterestedResult } from '../../../hooks/interested';
import { useAlert } from '../../../hooks/alert';
import getRealm from '../../../services/realm';

import {
  Container,
  Section,
  SectionItem,
  SectionItemLabel,
  SectionItemValue,
} from './styles';

type InterestedScreenProps = RouteProp<InterestedStackProps, 'ShowInterested'>;

const Show: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [interested, setInterested] = useState<InterestedResult>(
    {} as InterestedResult,
  );

  const { success } = useAlert();
  const { params } = useRoute<InterestedScreenProps>();
  const navigation = useNavigation();
  const { genderTypes, lifeStageTypes, findById } = useInterested();
  const { trans } = useLocale();

  useEffect(() => {
    async function loadInterested(): Promise<void> {
      const data = await findById(params.id);

      if (data) setInterested(data);

      // setLoading(false);
    }

    loadInterested();
  }, [findById, params.id]);

  useEffect(() => {
    const name = interested?.name || 'Interested';

    navigation.setOptions({
      title: name.split(' ')[0],
    });
  }, [navigation, interested?.name]);

  const handleChangeProps = useCallback(
    async (key: string, value: string) => {
      success();
      const realm = await getRealm();

      realm.write(() => {
        realm.create('Interested', { id: interested?.id, [key]: value }, true);
      });
    },
    [interested?.id, success],
  );

  return (
    <Container>
      <Section>
        <SectionItem>
          <SectionItemLabel>
            {trans('interested.create.nameLabel')}
          </SectionItemLabel>
          {loading ? (
            <Placeholder Animation={Fade}>
              <PlaceholderLine
                height={16}
                width={34}
                style={{ marginTop: 14, marginLeft: 10, marginBottom: 10 }}
              />
            </Placeholder>
          ) : (
            <SectionItemValue>{interested?.name}</SectionItemValue>
          )}
        </SectionItem>

        <Select
          label={trans('interested.create.lifeStageLabel')}
          placeholder={trans('interested.create.lifeStagePlaceholder')}
          values={lifeStageTypes}
          defaultValue={interested?.lifeStage}
          onSelect={item => handleChangeProps('lifeStage', item.value)}
        />

        <Select
          label={trans('interested.create.genderLabel')}
          placeholder={trans('interested.create.genderPlaceholder')}
          values={genderTypes}
          defaultValue={interested?.gender}
          onSelect={item => handleChangeProps('gender', item.value)}
        />
      </Section>
    </Container>
  );
};

export default Show;
