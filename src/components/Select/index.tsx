import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Modal } from 'react-native';
import { Form } from '@unform/mobile';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

import Input from '../Input';
import { useAlert } from '../../hooks/alert';
import { useLocale } from '../../hooks/locale';

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
  loading?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  values,
  defaultValue,
  placeholder,
  filterable,
  onSelect,
  alertOnSelect = false,
  loading = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<SelectItem>();
  const [selectVisible, setSelectVisible] = useState(false);
  const [filter, setFilter] = useState('');

  const { success } = useAlert();
  const { trans } = useLocale();

  const items = useMemo(() => {
    if (!filter) return values;

    return values.filter(
      i => i.label.toLowerCase().indexOf(filter.toLowerCase()) > -1,
    );
  }, [values, filter]);

  useEffect(() => {
    if (defaultValue) {
      const item = values.find(a => a.value === defaultValue);

      setSelectedValue(item);
    }
  }, [defaultValue, values]);

  const handleSelectItem = useCallback(
    (value: SelectItem) => {
      if (alertOnSelect) success();
      if (onSelect) onSelect(value);

      setSelectedValue(value);

      setSelectVisible(false);

      setFilter('');
    },
    [onSelect, success, alertOnSelect],
  );

  if (loading) {
    return (
      <Container>
        <Label>{label}</Label>

        <Placeholder Animation={Fade}>
          <PlaceholderLine
            height={16}
            width={34}
            style={{ marginTop: 14, marginLeft: 10 }}
          />
        </Placeholder>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Label>{label}</Label>

        <SelectButton
          onPress={() => setSelectVisible(!selectVisible)}
          hitSlop={{ top: 22, bottom: 22, left: 50, right: 50 }}
        >
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

                <PickerClose
                  onPress={() => {
                    setSelectVisible(false);
                    setFilter('');
                  }}
                >
                  <Icon name="x" size={36} />
                </PickerClose>
              </PickerHeader>

              {filterable && (
                <Form onSubmit={() => null}>
                  <Input
                    name="filter"
                    autoFocus
                    onChangeText={setFilter}
                    placeholder={trans('settings.searchPlaceholder')}
                  />
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
