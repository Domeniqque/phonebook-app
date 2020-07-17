import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { PhoneNumber } from '../../hooks/phone';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  position: relative;
`;

export const PhoneList = styled(FlatList as new () => FlatList<PhoneNumber>)`
  margin-top: 5px;
  padding: 0 16px;
`;

export const PhoneListItem = styled(RectButton)`
  height: 70px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PhoneListItemNumber = styled.Text`
  font-size: 21px;
  margin-left: 5px;
`;

export const Divisor = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.Text`
  font-size: 14px;
  font-weight: bold;
  background: #f6f6f6;
  padding: 4px 10px;
  margin-right: 5px;
`;

export const EmptyContentContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  flex: 1;
`;
export const CenteredAddButton = styled.TouchableOpacity`
  flex-direction: row;
  border: #000;
  padding: 10px 16px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const CenteredAddButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;
