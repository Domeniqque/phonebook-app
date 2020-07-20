import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  height?: number;
}

interface TextInputProps {
  height?: number;
}

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${props => props.height || 64}px;
  padding: 0 16px;
  background: #eee;
  border-color: #eee;
  margin-bottom: 8px;
  border-width: 2px;

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

export const TextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  color: #000;
  font-size: 20px;
  height: ${props => props.height}px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextError = styled.Text`
  font-size: 16px;
  color: #c53030;
  margin-bottom: 10px;
`;
