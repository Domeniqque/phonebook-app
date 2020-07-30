import styled, { css } from 'styled-components/native';

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
`;

export const ToggleModeBtn = styled.TouchableOpacity<ToggleBtnProps>`
  border: transparent;
  border-width: 2px;
  border-radius: 17px;
  min-height: 34px;
  padding: 4px 26px 4px;
  margin: 0px 4px 0;
  border-color: #eee;
  background: #f6f6f6;
  margin-bottom: 20px;

  ${props =>
    props.selected &&
    css`
      background: #000;
      border-color: #000;
    `}
`;

export const ToggleModeText = styled.Text<ToggleBtnProps>`
  font-size: 18px;

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
`;

export const LastNumberPreview = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;
