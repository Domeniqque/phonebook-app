import styled, { css } from 'styled-components/native';

interface FilterProps {
  selected?: boolean;
}

interface FilterTextProps {
  selected?: boolean;
}

export const Container = styled.View`
  margin: 10px 0;
`;

export const FilterList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const FilterItem = styled.TouchableOpacity<FilterProps>`
  border: transparent;
  border-width: 2px;
  border-radius: 17px;
  height: 34px;
  padding: 4px 14px;

  ${props =>
    props.selected &&
    css`
      border: #000;
      background: #000;
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
