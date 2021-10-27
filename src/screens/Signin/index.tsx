import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/goole.svg';
import AppleSvg from '../../assets/apple.svg';

import  {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from './styles';


export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            financas de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faca seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer />
    </Container>
  );
}