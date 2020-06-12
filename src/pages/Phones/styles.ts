import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export interface PhoneNumber {
  id: string;
  value: string;
  state: 'new' | 'received' | 'missed' | 'dont_exists';
  active: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

export const AddPhoneButton = styled.TouchableOpacity`
  height: 66px;
  width: 100%;
  border-width: 1px;
  border-color: #000;
  background: #000;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AddPhoneButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 4px;
`;

export const PhoneList = styled(FlatList as new () => FlatList<PhoneNumber>)``;

export const PhoneListItem = styled(RectButton)`
  height: 66px;
  width: 100%;
  border-top-width: 1px;
  border-top-color: #eee;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PhoneListItemNumber = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const PhoneListItemAction = styled.TouchableOpacity`
  width: 60px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
