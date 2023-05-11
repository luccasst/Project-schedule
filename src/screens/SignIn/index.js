import React from 'react';
import { View, Image } from 'react-native';
import {
    Container,
    InputAera,
    CustomButton,
    CustomButtonText,
    SignInput,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import BarberLogo from '../../assets/bigode.png'

export default () => {
    return (
        <Container>
        <View>
        <Image source={BarberLogo} style={{ width: 200, height: 100 }} />
      </View>
      < InputAera>

      <CustomButton>
        <CustomButtonText>LOGIN</CustomButtonText>
      </CustomButton>

      </InputAera>

      <SignMessageButton>
            <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Cadastrar</SignMessageButtonTextBold>
      </SignMessageButton>
        </Container>
    )
}