import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';

import checkmarkSource from '../../assets/lottie-checkmark.json';

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
  CheckmarkContent,
} from './styles';

interface AlertProps {
  title: string;
  text?: string;
  visible?: boolean;
  confirmText: string;
  onConfirm?(): void;
  cancelText?: string;
  onCancel?(): void;
  useCheckmark?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  title,
  visible,
  text,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  useCheckmark,
}) => {
  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm();
  }, [onConfirm]);

  return (
    <Container>
      <Modal animationType="none" transparent={!useCheckmark} visible={visible}>
        <Backdrop transparent={!useCheckmark}>
          {useCheckmark ? (
            <CheckmarkContent>
              <LottieView
                source={checkmarkSource}
                style={{ width: 90 }}
                resizeMode="cover"
                autoSize
                autoPlay
                loop={false}
              />
            </CheckmarkContent>
          ) : (
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
          )}
        </Backdrop>
      </Modal>
    </Container>
  );
};

export default Alert;
