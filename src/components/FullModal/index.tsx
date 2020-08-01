import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  CloseButton,
} from './styles';

interface FullModalProps {
  title: string;
  subtitle?: string;
  onClose(): void;
  visible: boolean;
}

const FullModal: React.FC<FullModalProps> = ({
  title,
  subtitle,
  onClose,
  visible = false,
  children,
}) => {
  return (
    <Modal transparent={false} visible={visible}>
      <SafeAreaView>
        <Container>
          <Header>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </Header>

          <CloseButton onPress={onClose}>
            <Icon name="x" size={36} color="#000" />
          </CloseButton>

          <Content keyboardShouldPersistTaps="always">{children}</Content>
        </Container>
      </SafeAreaView>
    </Modal>
  );
};

export default FullModal;
