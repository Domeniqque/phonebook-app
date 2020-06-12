import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { PhoneNumber } from '../../hooks/usePhone';

export const Container = styled.View`
  flex: 1;
  padding: 20px 16px;
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
