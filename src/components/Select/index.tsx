import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Label,
  SelectButton,
  SelectButtonText,
  PickerBlackdrop,
  pickerStyle,
} from './styles';

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  values: SelectItem[];
  defaultValue?: string;
  placeholder?: string;
  onSelect?(selected: SelectItem): void;
}

const Select: React.FC<SelectProps> = ({
  values,
  defaultValue,
  placeholder,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState<SelectItem>();
  const [selectVisible, setSelectVisible] = useState(false);

  const navigation = useNavigation();

  const findItemByValue = useCallback(
    (value: string): SelectItem | undefined => {
      return values.find(a => a.value === value);
    },
    [values],
  );

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !selectVisible,
    });
  }, [selectVisible, navigation]);

  useEffect(() => {
    if (defaultValue) {
      const item = findItemByValue(defaultValue);

      setSelectedValue(item);
    }
  }, [defaultValue, findItemByValue]);

  const handleChangeValue = useCallback(
    (value: React.ReactText, index: number) => {
      const item = findItemByValue(value as string);

      setSelectedValue(item);
    },
    [findItemByValue],
  );

  const handleCLoseSelect = useCallback(() => {
    setSelectVisible(false);

    if (onSelect && selectedValue) onSelect(selectedValue);
  }, [onSelect, selectedValue]);

  return (
    <>
      <Container>
        <Label>Idioma</Label>

        <SelectButton onPress={() => setSelectVisible(!selectVisible)}>
          <SelectButtonText>
            {selectedValue?.label || placeholder}
          </SelectButtonText>
          <Icon name="chevron-down" size={20} style={{ paddingTop: 4 }} />
        </SelectButton>
      </Container>

      {selectVisible && (
        <>
          <Picker
            selectedValue={selectedValue?.value}
            style={pickerStyle.select}
            onValueChange={handleChangeValue}
          >
            {values.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>

          <PickerBlackdrop onPress={handleCLoseSelect} />
        </>
      )}
    </>
  );
};

export default Select;
