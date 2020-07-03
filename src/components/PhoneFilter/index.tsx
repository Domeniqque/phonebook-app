import React, { useState, useCallback } from 'react';
import { PhoneStatus } from '../../hooks/phone';
import { useLang } from '../../hooks/lang';

import { Container, FilterList, FilterItem, FilterItemText } from './styles';

interface PhoneFilter {
  onStatusChange(status: PhoneStatus): void;
}

const PhoneFilter: React.FC<PhoneFilter> = ({ onStatusChange }) => {
  const [selected, setSelected] = useState<PhoneStatus>(PhoneStatus.New);

  const { trans } = useLang();

  const handleSelect = useCallback(
    (status: PhoneStatus) => {
      setSelected(status);

      onStatusChange(status);
    },
    [onStatusChange],
  );

  return (
    <Container>
      <FilterList>
        <FilterItem
          onPress={() => handleSelect(PhoneStatus.New)}
          selected={PhoneStatus.New === selected}
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
