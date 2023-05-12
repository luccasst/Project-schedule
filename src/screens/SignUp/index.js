import React, { useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../context/UserContext';

import {
    Container,
    InputAera,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './style';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import BarberLogo from '../../assets/bigode.png';
import EmailIcon from '../../assets/mail.png';
import SenhaIcon from '../../assets/cadeado.png';
import PerfilIcon from '../../assets/perfil.png';
 
export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [namelField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [senhalField, setSenhaField] = useState('');

  const handleSignClick = async () => {
    if(namelField != '' && emailField != '' && senhalField != '') {
        let res = await Api.signUp(namelField, emailField, senhalField);
        if(res.token) {
          await AsyncStorage.setItem('token', res.token);
          userDispatch({
            type: 'setAvatar',
            payload:{
              avatar: res.data.avatar
            }
          });

          navigation.reset({
            routes:[{name: 'MainTab'}]
          });


        } else {
          alert("Erro: "+res.error);
        }
    } else {
      alert("Preencha os campos!");
    }
  }

  const handleMessageButtonClick = () => {
      navigation.reset({
        routes: [{name: 'SignIn'}]
      });
  }

    return (
        <Container>
        <View>
        <Image source={BarberLogo} style={{ width: 200, height: 100 }} />
      </View>
      < InputAera>
      <SignInput
        IconSvg={PerfilIcon}
        placeholder="Digite seu nome"
        value={namelField}
        onChangeText={t=>setNameField(t)}
      />

        <SignInput
        IconSvg={EmailIcon}
        placeholder="Digite seu e-mail"
        value={emailField}
        onChangeText={t=>setEmailField(t)}
      />

        <SignInput
        IconSvg={SenhaIcon}
        placeholder="Digite sua senha"
        value={senhalField}
        onChangeText={t=>setSenhaField(t)}
        password={true}
      />

      
      <CustomButton onPress={handleSignClick}>
        <CustomButtonText>CADASTRAR</CustomButtonText>
      </CustomButton>

      </InputAera>

      <SignMessageButton onPress={handleMessageButtonClick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
        </Container>
    )
}