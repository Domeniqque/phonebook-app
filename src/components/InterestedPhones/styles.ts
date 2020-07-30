import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 16px;
  margin: 30px 0;
`;

export const PhonesNumbersHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const PhoneNumbersAdd = styled.TouchableOpacity`
  flex-direction: row;
  padding: 4px 10px;
  border-width: 1px;
  border-color: #000;
  border-radius: 12px;
`;

export const PhoneNumbersAddText = styled.Text`
  font-size: 14px;
`;

export const PhonesNumbersTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const PhonesNumbersContainer = styled.View``;

export const PhoneNumberItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
`;

export const PhoneNumberItemBtn = styled.TouchableOpacity`
  padding: 10px 0;
  margin-left: 4px;
  flex: 1;
`;

export const PhoneNumberItemText = styled.Text`
  font-size: 20px;
`;

export const PhoneNumberItemDelete = styled.TouchableOpacity`
  padding: 10px;
`;

export const AddContent = styled.View`
  padding: 20px 16px;
  position: relative;
`;

export const AddHeader = styled.View`
  margin-top: 10px;
`;

export const AddTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export const AddSubtitle = styled.Text`
  font-size: 21px;
  margin: 10px 0;
`;

export const AddCloseButton = styled.TouchableOpacity`
  position: absolute;
  padding: 10px;
  top: 10px;
  right: 10px;
`;
