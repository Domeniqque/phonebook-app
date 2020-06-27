import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-native';

import {
  Container,
  Backdrop,
  Content,
  Title,
  Text,
  TextButton,
  TextButtonText,
  RoundedButton,
  RoundedButtonText,
  ButtonContainer,
} from './styles';

interface AlertProps {
  title: string;
  text?: string;
  visible?: boolean;
  confirmText: string;
  onConfirm?(): void;
  cancelText?: string;
  onCancel?(): void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  visible,
  text,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}) => {
  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm();
  }, [onConfirm]);

  return (
    <Container>
      <Modal animationType="none" transparent visible={visible}>
        <Backdrop>
          <Content>
            {title && <Title>{title}</Title>}

            {text && <Text>{text}</Text>}

            <ButtonContainer>
              {cancelText && (
                <TextButton onPress={handleCancel}>
                  <TextButtonText>{cancelText}</TextButtonText>
                </TextButton>
              )}

              <RoundedButton onPress={handleConfirm}>
                <RoundedButtonText>{confirmText || 'OK'}</RoundedButtonText>
              </RoundedButton>
            </ButtonContainer>
          </Content>
        </Backdrop>
      </Modal>
    </Container>
  );
};

export default Alert;
