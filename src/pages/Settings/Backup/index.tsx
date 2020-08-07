import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Icon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';
import {
  Container,
  Content,
  HeaderContent,
  UserEmail,
  Title,
  Description,
  AccountInfo,
  AccountTitle,
  SignOut,
  SignOutText,
  Options,
  Recover,
  RecoverText,
  RecoverDescription,
} from './styles';
import { useCredential } from '../../../hooks/credential';
import { useAlert } from '../../../hooks/alert';
import { Divisor } from '../styles';

const Backup: React.FC = () => {
  const { signed, signIn, signOut, userEmail, userName } = useCredential();
  const { alert } = useAlert();

  const startSignIn = useCallback(() => {
    alert({
      title: 'Cópia Automática',
      text: `Ao fazer login na sua conta no Google você concorda que: \n\n(a) está dando autorização ao aplicativo para enviar automaticamente uma cópia dos seus dados para o seu Google Drive, \n\n(b) seus dados não serão enviados para outro lugar, exceto sua conta no Google Drive, \n\n(c) não teremos acesso a suas informações pessoais e \n\n(d) que pode cancelar o envio e o acesso do aplicativo a qualquer momento!`,
      confirmText: 'Concordo, fazer login',
      cancelText: 'Fazer depois',
      onCancel: () => null,
      onConfirm: () => signIn(),
    });
  }, [alert, signIn]);

  if (!signed) {
    return (
      <Container>
        <Content>
          <HeaderContent>
            <Icon name="upload-cloud" size={46} />

            <Title>Cópia Automática</Title>

            <Description>
              Fique seguro com os seus dados! Habilite a cópia automática para o
              seu Google Drive
            </Description>
          </HeaderContent>

          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={startSignIn}
          />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <HeaderContent>
          <Icon name="upload-cloud" size={48} />

          <Title>Cópia Automática</Title>

          <Description>Último envio 21/03/2020 16h30</Description>
        </HeaderContent>
      </Content>

      <Options>
        <AccountInfo>
          <AccountTitle>{userName}</AccountTitle>
          <UserEmail>{userEmail}</UserEmail>
        </AccountInfo>

        <Recover>
          <View>
            <RecoverText>Recuperar</RecoverText>
            <RecoverDescription>
              Obtenha a última cópia enviada
            </RecoverDescription>
          </View>
          <Icon name="chevron-right" size={20} style={{ paddingTop: 4 }} />
        </Recover>

        <Divisor />

        <SignOut onPress={signOut}>
          <SignOutText>Desativar cópia automática</SignOutText>
          <Icon
            name="chevron-right"
            size={20}
            style={{ paddingTop: 4, color: '#e11900' }}
          />
        </SignOut>
      </Options>
    </Container>
  );
};

export default Backup;
