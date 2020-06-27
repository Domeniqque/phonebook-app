import styled, { css } from 'styled-components/native';

interface BackdropProps {
  transparent?: boolean;
}

export const Container = styled.View.attrs({
  contentContainerStyle: () => css`
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
})``;

export const Backdrop = styled.View<BackdropProps>`
  background-color: ${props =>
    props.transparent ? 'rgba(0, 0, 0, 0.1)' : '#fff'};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  margin: 0 60px;
  background-color: #fff;
  border-radius: 20px;
  padding: 25px 0;
  align-items: center;
  z-index: 5000;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
`;

export const Text = styled.Text`
  font-size: 18px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

export const RoundedButton = styled.TouchableOpacity`
  background: #000;
  padding: 12px 20px;
  margin: 0 20px;
  border-radius: 20px;
`;

export const RoundedButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
`;

export const TextButton = styled.TouchableOpacity`
  margin: 0 20px;
  padding: 12px 20px;
`;

export const TextButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
`;

export const CheckmarkContent = styled.View``;
