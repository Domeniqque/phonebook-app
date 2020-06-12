import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacityProps } from 'react-native';

import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ text, icon, ...rest }) => {
  return (
    <ButtonContainer {...rest}>
      {icon && <Icon name={icon} size={24} color="#fff" />}
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
