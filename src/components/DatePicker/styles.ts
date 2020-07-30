import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  margin: 16px 0;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  padding-right: 12px;
`;

export const SelectButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  font-size: 18px;
  margin-right: 12px;
`;

export const ModalTimePicker = styled.View`
  background: #f6f6f6;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
`;
