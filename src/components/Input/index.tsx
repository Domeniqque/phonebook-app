import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, View } from 'react-native';

import { useField } from '@unform/core';

import { Label, Container, TextInput, Icon, TextError } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  icon?: string;
  formatValue?(rawValue: string): string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, label, icon, formatValue, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const handleChangeText = useCallback(
    (rawValue: string) => {
      const value = formatValue ? formatValue(rawValue) : rawValue;

      inputValueRef.current.value = value;
      inputElementRef.current.setNativeProps({ text: value });
    },
    [formatValue],
  );

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
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
    <View>
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
          ref={inputElementRef}
          onBlur={handleInputBlur}
          keyboardAppearance="dark"
          onFocus={handleInputFocus}
          defaultValue={defaultValue}
          placeholderTextColor="#666360"
          onChangeText={handleChangeText}
          {...rest}
        />
      </Container>

      {error && <TextError>{error}</TextError>}
    </View>
  );
};

export default forwardRef(Input);
