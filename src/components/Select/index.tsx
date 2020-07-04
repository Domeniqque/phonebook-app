import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Modal } from 'react-native';
import { Form } from '@unform/mobile';

import Input from '../Input';
import { useAlert } from '../../hooks/alert';

import {
  Container,
  Label,
  SelectButton,
  SelectButtonText,
  PickerContainer,
  PickerContent,
  PickerHeader,
  PickerClose,
  PickerTitle,
  PickerList,
  PickerItem,
  PickerItemText,
  Divisor,
} from './styles';

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  values: SelectItem[];
  defaultValue?: string;
  placeholder?: string;
  filterable?: boolean;
  alertOnSelect?: boolean;
  onSelect?(selected: SelectItem): void;
}

const Select: React.FC<SelectProps> = ({
  label,
  values,
  defaultValue,
  placeholder,
  filterable,
  onSelect,
  alertOnSelect = true,
}) => {
  const [selectedValue, setSelectedValue] = useState<SelectItem>();
  const [selectVisible, setSelectVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const { success } = useAlert();

  const items = useMemo(() => {
    if (!filter) return values;

    return values.filter(i => i.label.indexOf(filter) > -1);
  }, [values, filter]);

  useEffect(() => {
    if (defaultValue) {
      const item = values.find(a => a.value === defaultValue);

      setSelectedValue(item);
    }
  }, [defaultValue, values]);

  const handleSelectItem = useCallback(
    (value: SelectItem) => {
      setSelectedValue(value);
      setSelectVisible(false);

      if (onSelect) onSelect(value);

      if (alertOnSelect) success();
    },
    [onSelect, success, alertOnSelect],
  );

  return (
    <>
      <Container>
        <Label>{label}</Label>

        <SelectButton onPress={() => setSelectVisible(!selectVisible)}>
          <SelectButtonText>
            {selectedValue?.label || placeholder}
          </SelectButtonText>
          <Icon name="chevron-down" size={20} style={{ paddingTop: 4 }} />
        </SelectButton>
      </Container>

      {selectVisible && (
        <PickerContainer>
          <Modal animationType="none">
            <PickerContent>
              <PickerHeader>
                {placeholder && <PickerTitle>{placeholder}</PickerTitle>}

                <PickerClose onPress={() => setSelectVisible(false)}>
                  <Icon name="x" size={36} />
                </PickerClose>
              </PickerHeader>

              {filterable && (
                <Form onSubmit={() => null}>
                  <Input name="filter" onChangeText={setFilter} />
                </Form>
              )}

              <PickerList
                data={items}
                keyExtractor={item => item.value}
                ItemSeparatorComponent={() => <Divisor />}
                renderItem={({ item }) => (
                  <PickerItem onPress={() => handleSelectItem(item)}>
                    <PickerItemText>{item.label}</PickerItemText>
                  </PickerItem>
                )}
              />
            </PickerContent>
          </Modal>
        </PickerContainer>
      )}
    </>
  );
};

export default Select;
