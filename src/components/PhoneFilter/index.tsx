import React, { useState, useCallback } from 'react';
import { PhoneStatus } from '../../hooks/phone';

import { Container, FilterList, FilterItem, FilterItemText } from './styles';

interface PhoneFilter {
  onStatusChange(status: PhoneStatus): void;
}

const PhoneFilter: React.FC<PhoneFilter> = ({ onStatusChange }) => {
  const [selected, setSelected] = useState<PhoneStatus>(PhoneStatus.New);

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
            Novos
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.Received)}
          selected={PhoneStatus.Received === selected}
        >
          <FilterItemText selected={PhoneStatus.Received === selected}>
            Atendidos
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.Missed)}
          selected={PhoneStatus.Missed === selected}
        >
          <FilterItemText selected={PhoneStatus.Missed === selected}>
            Não atendidos
          </FilterItemText>
        </FilterItem>

        <FilterItem
          onPress={() => handleSelect(PhoneStatus.DontExists)}
          selected={PhoneStatus.DontExists === selected}
        >
          <FilterItemText selected={PhoneStatus.DontExists === selected}>
            Inexistentes
          </FilterItemText>
        </FilterItem>
      </FilterList>
    </Container>
  );
};

export default PhoneFilter;
