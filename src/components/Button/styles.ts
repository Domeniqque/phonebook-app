import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  isDisabled: boolean;
}

export const ButtonContainer = styled(RectButton)<ButtonProps>`
  height: 66px;
  width: 100%;
  border-width: 1px;
  border-color: #000;
  background: #000;
  margin: 10px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 33px;

  opacity: ${props => (props.isDisabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-left: 8px;
  margin-bottom: 2px;
`;
