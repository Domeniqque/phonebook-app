import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Label, Container, TextInput, Icon, TextError } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const PhoneInput: React.FC<InputProps> = ({ name, icon, label, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [mask, setMask] = useState('([000]) [00000] [0000]');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container isFocused={isFocused} isErrored={!!error}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused || isFilled ? '#000' : '#666360'}
          />
        )}

        <TextInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          placeholderTextColor="#666360"
          keyboardType="numeric"
          onChangeText={(formatted, extracted) => {
            inputValueRef.current.value = formatted ?? '';
          }}
          placeholder="(000) 00000 0000"
          mask="([000]) [00000] [0000]"
          {...rest}
        />
      </Container>
      {error && <TextError>{error}</TextError>}
    </>
  );
};

export default PhoneInput;
