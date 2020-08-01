import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const customFontsize = Math.min(Math.floor(width * 0.04), 18);

console.log(width, customFontsize);

interface ToggleBtnProps {
  selected?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
  background: #fff;
`;

export const Tip = styled.View`
  border-left-color: #333;
  border-left-width: 4px;
  padding: 5px 15px;
  margin: 16px 0;
  background: #f6f6f6;
`;

export const TipText = styled.Text`
  font-size: 18px;
  text-align: left;
  margin: 10px 0;
  color: #333;
`;

export const ToggleModeLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

export const ToggleMode = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ToggleModeBtn = styled.TouchableOpacity<ToggleBtnProps>`
  border: transparent;
  border-width: 2px;
  border-radius: 20px;
  min-height: 34px;
  padding: 8px 28px 8px;
  margin: 0px 4px 0;
  background: #f6f6f6;
  flex: 1;
  align-items: center;
  max-width: 200px;

  ${props =>
    props.selected
      ? css`
          background: #000;
          border-color: #000;
        `
      : css`
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        `}
`;

export const ToggleModeText = styled.Text<ToggleBtnProps>`
  font-size: ${customFontsize}px;

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
`;

export const LastNumberPreview = styled.Text`
  font-size: ${customFontsize}px;
  color: #333;
  margin-bottom: 20px;
`;
