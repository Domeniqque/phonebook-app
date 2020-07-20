import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 35px 0;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 4px 10px;
  border-width: 1px;
  border-color: #000;
  border-radius: 12px;
`;

export const AddButtonText = styled.Text`
  font-size: 14px;
`;
