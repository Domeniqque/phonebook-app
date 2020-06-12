import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  height: 66px;
  width: 100%;
  border-width: 1px;
  border-color: #000;
  background: #000;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 4px;
`;
