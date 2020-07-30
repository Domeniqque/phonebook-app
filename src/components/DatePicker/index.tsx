/* eslint-disable import/no-duplicates */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Keyboard, LayoutAnimation, Platform } from 'react-native';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

import { useLocale } from '../../hooks/locale';

import {
  Container,
  Label,
  SelectButton,
  SelectButtonText,
  ModalTimePicker,
} from './styles';

interface DatePickerProp {
  label?: string;
  onSelect(date: Date): void;
}

const DatePicker: React.FC<DatePickerProp> = ({ label, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const { language, country } = useLocale();

  useEffect(() => {
    if (modalVisible) Keyboard.dismiss();
  }, [modalVisible]);

  const handleDateChange = useCallback(
    (e: Event, dateValue?: Date | undefined) => {
      if (!dateValue) return;
      setModalVisible(Platform.OS === 'ios');
      setDate(dateValue);
      onSelect(dateValue);

      console.log({ dateValue });
    },
    [onSelect],
  );

  const displayDate = useMemo(() => {
    const dateLocale = language === 'pt_BR' ? ptBR : enUS;

    const dateFormated = format(date, 'cccc, dd MMM yyyy', {
      locale: dateLocale,
    });

    return dateFormated;
  }, [date, language]);

  const pickerLocale = useMemo(
    () => country.defaultLanguage.replace('_', '-'),
    [country.defaultLanguage],
  );

  const handleOpenModal = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <>
      <Container>
        {label && <Label>{label}</Label>}

        <SelectButton onPress={handleOpenModal}>
          <SelectButtonText>{displayDate}</SelectButtonText>

          <Icon name="chevron-down" size={20} style={{ paddingTop: 4 }} />
        </SelectButton>
      </Container>

      {modalVisible &&
        (Platform.OS === 'ios' ? (
          <ModalTimePicker>
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
              locale={pickerLocale}
            />
          </ModalTimePicker>
        ) : (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={handleDateChange}
            locale={pickerLocale}
          />
        ))}
    </>
  );
};

export default DatePicker;
