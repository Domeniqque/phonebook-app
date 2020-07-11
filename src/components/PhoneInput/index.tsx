import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  PhoneNumber as PhoneNumberLib,
  CountryCode,
} from 'libphonenumber-js/mobile';
import { TextInputProps } from 'react-native';

import getNumberInstance from '../../utils/getNumberInstance';

import Input from '../Input';

export type PhoneNumberInstance = PhoneNumberLib | undefined;

export interface PhoneInputRef {
  getPhoneInstance(): PhoneNumberInstance | undefined;
  focus(): void;
}

interface PhoneInputProps extends TextInputProps {
  name: string;
  label?: string;
  countryCode: CountryCode;
}

const PhoneInput: React.RefForwardingComponent<
  PhoneInputRef,
  PhoneInputProps
> = ({ name, countryCode, ...rest }, ref) => {
  const inputRef = useRef<any>(null);

  const [phoneInstance, setPhoneInstance] = useState<PhoneNumberInstance>(
    undefined,
  );

  const handleFormatValue = useCallback(
    (value: string) => {
      if (value === '') return '';

      const numberInstance = getNumberInstance(value, countryCode);

      setPhoneInstance(numberInstance);

      return numberInstance?.formatNational() || value;
    },
    [countryCode],
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
      keyboardType="phone-pad"
      {...rest}
    />
  );
};

export default forwardRef(PhoneInput);
