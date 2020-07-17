import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import FabButton from '../../components/FabButton';
import { Container } from './styles';

const Interested: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Interested</Text>

      <FabButton onPress={() => navigation.navigate('CreateInterested')} />
    </Container>
  );
};

export default Interested;
