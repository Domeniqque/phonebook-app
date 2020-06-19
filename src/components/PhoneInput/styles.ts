import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TextInputMask from 'react-native-text-input-mask';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #000;
    `}
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #000;
  font-size: 18px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextError = styled.Text`
  font-size: 16px;
  color: #c53030;
  margin-bottom: 10px;
`;
