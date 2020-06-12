import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  icon?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, icon, isLoading, ...rest }) => {
  return (
    <ButtonContainer {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {icon && <Icon name={icon} size={24} color="#fff" />}
          <ButtonText>{text}</ButtonText>
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
