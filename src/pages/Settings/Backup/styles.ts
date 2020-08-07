import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 28px 0 16px;
`;

export const Description = styled.Text`
  font-size: 18px;
  max-width: 80%;
  text-align: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const HeaderContent = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0 40px;
`;

export const UserEmail = styled.Text`
  margin-top: 4px;
`;

export const AccountInfo = styled.View`
  padding: 16px 34px;
  margin: 40px auto;
  background: #f6f6f6;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const AccountTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SignOut = styled.TouchableOpacity`
  padding: 16px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const SignOutText = styled.Text`
  color: #e11900;
  margin: auto 0;
  font-size: 16px;
`;

export const Options = styled.View`
  flex: 1;
`;

export const Recover = styled.TouchableOpacity`
  padding: 16px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const RecoverText = styled.Text`
  margin: auto 0;
  font-size: 16px;
  font-weight: bold;
`;

export const RecoverDescription = styled.Text`
  margin-top: 4px;
`;
