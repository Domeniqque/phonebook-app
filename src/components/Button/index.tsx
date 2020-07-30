import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  text: string;
  icon?: string;
  isLoading?: boolean;
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  isLoading = false,
  onPress,
  outlined = false,
  ...rest
}) => {
  const handlePress = useCallback(
    (param: boolean) => {
      return !isLoading && onPress ? onPress(param) : null;
    },
    [onPress, isLoading],
  );

  return (
    <ButtonContainer
      isDisabled={isLoading}
      outlined={outlined}
      onPress={handlePress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={outlined ? '#000' : '#fff'} />
      ) : (
        <>
          {icon && (
            <Icon name={icon} size={24} color={outlined ? '#000' : '#fff'} />
          )}
          <ButtonText outlined={outlined}>{text}</ButtonText>
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
