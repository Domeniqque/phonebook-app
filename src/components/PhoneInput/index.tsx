import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon, TextError } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  placeholder: string;
}

interface InputValueReference {
  value: string;
}

const PhoneInput: React.FC<InputProps> = ({
  name,
  icon,
  placeholder,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

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
          placeholder={placeholder}
          mask="([00]) [00000]-[0000]"
          {...rest}
        />
      </Container>
      {error && <TextError>{error}</TextError>}
    </>
  );
};

export default PhoneInput;
