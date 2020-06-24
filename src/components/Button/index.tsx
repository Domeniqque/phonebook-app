import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  text: string;
  icon?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  isLoading = false,
  onPress,
  ...rest
}) => {
  const handlePress = useCallback(
    (param: boolean) => {
      return !isLoading && onPress ? onPress(param) : null;
    },
    [onPress, isLoading],
  );

  return (
    <ButtonContainer isDisabled={isLoading} onPress={handlePress} {...rest}>
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
