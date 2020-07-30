import React, { createContext, useState, useCallback, useContext } from 'react';

import Alert from '../components/Alert';

interface AlertProps {
  title: string;
  text?: string;
  confirmText: string;
  onConfirm?(): void;
  cancelText?: string;
  onCancel?(): void;
}

interface AlertContextData {
  success(time?: number): void;
  alert(data: AlertProps): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider: React.FC = ({ children }) => {
  const [alertProps, setAlertProps] = useState({} as AlertProps);
  const [opened, setOpened] = useState(false);
  const [useCheckmark, setUseCheckmark] = useState(false);

  const alert = useCallback((data: AlertProps) => {
    setAlertProps(data);
    setOpened(true);
  }, []);

  const success = useCallback((time: number) => {
    setUseCheckmark(true);
    setOpened(true);

    const close = (): void => {
      setOpened(false);
      setUseCheckmark(false);
    };

    setTimeout(close, time || 1000);

    return () => close();
  }, []);

  const handleCancel = useCallback(() => {
    const { onCancel } = alertProps;
    if (onCancel) onCancel();
    setOpened(false);
  }, [alertProps]);

  const handleConfirm = useCallback(() => {
    const { onConfirm } = alertProps;
    if (onConfirm) onConfirm();
    setOpened(false);
  }, [alertProps]);

  return (
    <AlertContext.Provider value={{ alert, success }}>
      <Alert
        title={alertProps.title}
        text={alertProps.text}
        cancelText={alertProps.cancelText}
        confirmText={alertProps.confirmText}
        visible={opened}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        useCheckmark={useCheckmark}
      />
      {children}
    </AlertContext.Provider>
  );
};

export function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAuth must be used within an PhoneContext!');
  }

  return context;
}
