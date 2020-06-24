import React, {
  useCallback,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  parsePhoneNumberFromString,
  PhoneNumber as PhoneNumberLib,
} from 'libphonenumber-js/mobile';
import { TextInputProps } from 'react-native';

import Input from '../Input';

import countries from '../../resources/countries';

export type PhoneNumberInstance = PhoneNumberLib | undefined;

export interface PhoneInputRef {
  getPhoneInstance(): PhoneNumberInstance | undefined;
  focus(): void;
}

interface PhoneInputProps extends TextInputProps {
  name: string;
  label?: string;
  countryCode?: string;
}

const defaultDialCode = '+55';

const PhoneInput: React.RefForwardingComponent<
  PhoneInputRef,
  PhoneInputProps
> = ({ name, countryCode, ...rest }, ref) => {
  const inputRef = useRef<any>(null);

  const [phoneInstance, setPhoneInstance] = useState<PhoneNumberInstance>(
    undefined,
  );

  const country = useMemo(() => countries.find(c => c.code === countryCode), [
    countryCode,
  ]);

  const dialCode = useMemo(() => country?.dialCode || defaultDialCode, [
    country?.dialCode,
  ]);

  const handleFormatValue = useCallback(
    (value: string) => {
      if (value === '') return '';

      const number = parsePhoneNumberFromString(
        `${dialCode}${value.replace(new RegExp(`\\${dialCode}`, 'g'), '')}`,
      );

      setPhoneInstance(number);

      return number?.formatNational() || value;
    },
    [dialCode],
  );

  useImperativeHandle(ref, () => ({
    getPhoneInstance: () => phoneInstance,
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <Input
      ref={inputRef}
      name={name}
      icon="phone"
      formatValue={handleFormatValue}
      {...rest}
    />
  );
};

export default forwardRef(PhoneInput);
