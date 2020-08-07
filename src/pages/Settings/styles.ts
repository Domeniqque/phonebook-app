import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;
  padding: 10px 16px;
`;

export const Divisor = styled.View`
  height: 1px;
  border-top-color: #eee;
  border-top-width: 1px;
`;

export const BackupBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;

export const BackupBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: auto 0;
`;

export const Links = styled.View`
  flex: 1;
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
