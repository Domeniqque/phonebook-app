import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { FabBtn } from './styles';

const FabButton: React.FC<TouchableOpacityProps> = props => {
  return (
    <FabBtn {...props}>
      <Icon name="plus" size={34} color="#fff" />
    </FabBtn>
  );
};

export default FabButton;
