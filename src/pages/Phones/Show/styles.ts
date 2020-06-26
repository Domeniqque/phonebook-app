import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const margin = 4;
const cardWidth = width / 2 - margin * 2;

export const Container = styled.View`
  flex: 1;
  padding: 20px 16px;
  align-items: center;
  background: #fff;
`;

export const Header = styled.View`
  height: 120px;
  justify-content: center;
  align-items: center;
`;

export const HeaderAction = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const HeaderLabel = styled.Text`
  font-size: 12px;
  color: #757575;
`;

export const ActionContainer = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ActionButton = styled.TouchableOpacity`
  height: ${cardWidth}px;
  width: ${cardWidth}px;

  border-width: 2px;
  border-color: #eee;
  background: #fff;
  margin: 2px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.04);
  justify-content: center;
  align-items: center;
`;

export const ActionButtonText = styled.Text`
  font-size: 20px;
  margin-top: 14px;
`;

export const ActionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0;
`;
