import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 16px;
`;

export const Section = styled.View`
  margin: 14px 0;
`;

export const SectionItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const SectionItemLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const SectionItemValue = styled.Text`
  flex: 1;
  font-size: 18px;
  margin-left: 10px;
`;
