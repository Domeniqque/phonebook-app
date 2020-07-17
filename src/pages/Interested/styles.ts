import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { InterestedProps } from '../../schemas/InterestedSchema';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  position: relative;
  padding: 16px;
`;

export const InterestedList = styled(
  FlatList as new () => FlatList<InterestedProps>,
)``;

export const InterestedItem = styled(RectButton)`
  height: 70px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InterestedItemHeader = styled.View`
  flex: 1;
  margin-left: 5px;
`;

export const InterestedItemName = styled.Text`
  font-size: 21px;
`;

export const InterestedItemPhone = styled.Text`
  font-size: 14px;
  margin-top: 4px;
`;

export const Divisor = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
`;
