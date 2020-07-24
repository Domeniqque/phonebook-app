import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

interface FilterProps {
  selected?: boolean;
}

interface FilterTextProps {
  selected?: boolean;
}

export const Container = styled.View``;

export const FilterList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const FilterItem = styled.TouchableOpacity<FilterProps>`
  border: transparent;
  border-width: 2px;
  border-radius: 17px;
  min-height: 34px;
  padding: 4px 14px 4px;
  border-color: #f6f6f6;
  margin: 0px 4px 0;
  background: #fff;

  ${Platform.OS === 'ios' &&
  css`
    margin-top: 20px;
  `}

  ${props =>
    props.selected &&
    css`
      background: #000;
      border-color: #000;
    `}
`;

export const FilterItemText = styled.Text<FilterTextProps>`
  font-size: 18px;

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
`;
