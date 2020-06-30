import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const margin = 8;
const cardWidth = width / 2 - margin * 2;
const cardHeigth = cardWidth;

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background: #fff;
  align-items: center;
  justify-content: space-around;
`;

export const Header = styled.View`
  height: 120px;
  width: 100%;
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
  height: ${cardHeigth * 2 + 40}px;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 40px;
  margin: 20px 0;
`;

export const ActionButton = styled.TouchableOpacity`
  height: ${cardHeigth}px;
  width: ${cardWidth}px;

  border-width: 2px;
  border-color: #eee;
  border-radius: 10px;
  background: #fff;
  margin: 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.04);
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

export const DeleteButton = styled.TouchableOpacity`
  margin-right: 6px;
  padding: 10px 12px;
`;
