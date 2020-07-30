import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px 16px;
  position: relative;
  height: 100%;
`;

export const Content = styled.ScrollView``;

export const Header = styled.View`
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 21px;
  margin: 10px 0;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  padding: 8px;
  top: 0;
  right: 0;
`;
