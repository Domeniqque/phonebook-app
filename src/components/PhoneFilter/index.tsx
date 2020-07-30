import React, { useState, useCallback } from 'react';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { View, StyleProp, ViewStyle } from 'react-native';

import { PhoneStatus } from '../../hooks/phone';
import { useLocale } from '../../hooks/locale';

import { Container, FilterList, FilterItem, FilterItemText } from './styles';

interface PhoneFilter {
  onStatusChange(status: PhoneStatus): void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const PhoneFilter: React.FC<PhoneFilter> = ({
  style,
  onStatusChange,
  loading,
}) => {
  const [selected, setSelected] = useState<PhoneStatus>(PhoneStatus.New);

  const { trans } = useLocale();

  const handleSelect = useCallback(
    (status: PhoneStatus) => {
      setSelected(status);
      onStatusChange(status);
    },
    [onStatusChange],
  );

  if (loading) {
    return (
      <Placeholder Animation={Fade}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            marginBottom: 0,
          }}
        >
          <PlaceholderLine
            height={24}
            width={20}
            style={{ marginRight: 10, marginLeft: 16 }}
          />
          <PlaceholderLine height={24} width={30} style={{ marginRight: 10 }} />
          <PlaceholderLine height={24} width={24} style={{ marginRight: 10 }} />
          <PlaceholderLine height={24} width={32} style={{ marginRight: 10 }} />
          <PlaceholderLine height={24} width={20} style={{ marginRight: 10 }} />
        </View>
      </Placeholder>
    );
  }

  return (
    <Container style={style}>
      <FilterList>
        <FilterItem
          onPress={() => handleSelect(PhoneStatus.New)}
          selected={PhoneStatus.New === selected}
          style={{ marginLeft: 16 }}
        >
          <FilterItemText selected={PhoneStatus.New === selected}>
            {trans('phoneFilter.new')}
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.Received)}
          selected={PhoneStatus.Received === selected}
        >
          <FilterItemText selected={PhoneStatus.Received === selected}>
            {trans('phoneFilter.received')}
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.Missed)}
          selected={PhoneStatus.Missed === selected}
        >
          <FilterItemText selected={PhoneStatus.Missed === selected}>
            {trans('phoneFilter.missed')}
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.NotExist)}
          selected={PhoneStatus.NotExist === selected}
        >
          <FilterItemText selected={PhoneStatus.NotExist === selected}>
            {trans('phoneFilter.notExist')}
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.Removed)}
          selected={PhoneStatus.Removed === selected}
          style={{ marginRight: 16 }}
        >
          <FilterItemText selected={PhoneStatus.Removed === selected}>
            {trans('phoneFilter.removed')}
          </FilterItemText>
        </FilterItem>
      </FilterList>
    </Container>
  );
};

export default PhoneFilter;
