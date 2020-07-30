import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const margin = 8;
export const cardWidth = Math.min(width / 2 - margin * 2, 280);
export const cardHeigth = cardWidth;

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

export const PhoneStatusLabel = styled.Text`
  border-width: 2px;
  padding: 4px 14px;
  border-color: #f6f6f6;
  background: #f6f6f6;
  border-radius: 10px;
  overflow: hidden;
  text-transform: lowercase;
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
  border-radius: 10px;
  margin: 4px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-color: #eee;

  box-shadow: 0 0 4px rgba(0, 0, 0, 0.04);
`;

export const ActionButtonText = styled.Text`
  font-size: 18px;
  margin-top: 14px;
  text-transform: lowercase;
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

export const LastUpdate = styled.Text`
  position: absolute;
  bottom: 10px;
  font-size: 14px;
  color: #333;
`;
