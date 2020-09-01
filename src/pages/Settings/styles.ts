import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
`;

export const Content = styled.View`
  flex: 1;
  padding: 10px 20px;
  margin-top: 15px;
`;

export const Links = styled.View`
  flex: 1;
  margin: 80px 10px 10px;
  padding: 10px 0;
`;

export const LinksTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 20px;
`;

export const LinkButton = styled.TouchableOpacity`
  padding-bottom: 20px;
`;

export const LinkButtonText = styled.Text`
  font-size: 18px;
  color: #0070f3;
`;

export const Divisor = styled.View`
  height: 1px;
  width: 100%;
  background-color: #ddd;
`;

export const ShareButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const ShareText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;
